import inquirer from "inquirer";
import Truck from "./Truck.js";
import Vehicle from "./Vehicle.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import Wheel from "./Wheel.js";
import AbleToTow from "../interfaces/AbleToTow";

class Cli {
  vehicles: Vehicle[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'CreateOrSelect',
          message:
            'Would you like to create a new vehicle or perform an action on an existing vehicle?',
          choices: ['Create a new vehicle', 'Select an existing vehicle'],
        },
      ])
      .then((answers) => {
      
        if (answers.CreateOrSelect === 'Create a new vehicle') {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers: { selectedVehicleVin: string }) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers: { vehicleType: string }) => {
        switch (answers.vehicleType) {
          case "Car":
            this.createCar();
            break;
          case "Truck":
            this.createTruck();
            break;
          case "Motorbike":
            this.createMotorbike();
            break;
        }
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "towingCapacity", message: "Enter Towing Capacity" },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", name: "color", message: "Enter Color" },
        { type: "input", name: "make", message: "Enter Make" },
        { type: "input", name: "model", message: "Enter Model" },
        { type: "input", name: "year", message: "Enter Year" },
        { type: "input", name: "weight", message: "Enter Weight" },
        { type: "input", name: "topSpeed", message: "Enter Top Speed" },
        { type: "input", name: "frontWheelDiameter", message: "Enter Front Wheel Diameter" },
        { type: "input", name: "frontWheelBrand", message: "Enter Front Wheel Brand" },
        { type: "input", name: "rearWheelDiameter", message: "Enter Rear Wheel Diameter" },
        { type: "input", name: "rearWheelBrand", message: "Enter Rear Wheel Brand" },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [
            new Wheel(parseInt(answers.frontWheelDiameter), answers.frontWheelBrand),
            new Wheel(parseInt(answers.rearWheelDiameter), answers.rearWheelBrand),
          ]
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  findVehicleToTow(truck: Truck): void {
    const towableVehicles = this.vehicles.filter(v => v.vin !== truck.vin);
    if (towableVehicles.length === 0) {
      console.log("No other vehicles to tow.");
      this.performActions();
      return;
    }

    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: towableVehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers: { vehicleToTow: string }) => {
        const target = this.vehicles.find(v => v.vin === answers.vehicleToTow);
        if (target) {
          truck.tow(target);
        }
        this.performActions();
      });
  }

  performActions(): void {
    const currentVehicle = this.vehicles.find(v => v.vin === this.selectedVehicleVin);
    if (!currentVehicle) {
      console.log("Vehicle not found.");
      return;
    }

    const actions = [
      "Print details",
      "Start vehicle",
      "Accelerate 5 MPH",
      "Decelerate 5 MPH",
      "Stop vehicle",
      "Turn right",
      "Turn left",
      "Reverse",
      "Select another vehicle",
      "Create another vehicle",
      "Exit",
    ];

    if ("tow" in currentVehicle) actions.splice(8, 0, "Pull a Mater and Tow!");
    if ("doWheelie" in currentVehicle) actions.splice(9, 0, "Wheelie!");

    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: actions,
        },
      ])
      .then((answers: { action: string }) => {
        switch (answers.action) {
          case "Print details":
            currentVehicle.printDetails();
            break;
          case "Start vehicle":
            currentVehicle.start();
            break;
          case "Accelerate 5 MPH":
            currentVehicle.accelerate(5);
            break;
          case "Decelerate 5 MPH":
            currentVehicle.decelerate(5);
            break;
          case "Stop vehicle":
            currentVehicle.stop();
            break;
          case "Turn right":
            currentVehicle.turn("right");
            break;
          case "Turn left":
            currentVehicle.turn("left");
            break;
          case "Reverse":
            currentVehicle.reverse();
            break;
          case "Pull a Mater and Tow!":
            if (currentVehicle instanceof Truck) {
              this.findVehicleToTow(currentVehicle);
            }
            return;
          case "Wheelie!":
            if (currentVehicle instanceof Motorbike) {
              currentVehicle.wheelie();
            }
            break;
          case "Select another vehicle":
            this.chooseVehicle();
            return;
          case "Create another vehicle":
            this.createVehicle();
          case "Exit":
            this.exit = true;
            return;
        }

        this.performActions(); 
      });
  }
}

export default Cli;
