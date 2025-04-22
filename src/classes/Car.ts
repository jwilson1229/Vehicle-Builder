import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';

class Car extends Vehicle {
  color: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];

  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[]
  ) {
    super(vin, make, model);

    this.color = color;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;

    this.wheels = wheels.length === 4
      ? wheels
      : [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
  }

  override printDetails(): void {
    super.printDetails();

    console.log(`Color: ${this.color}`);
    console.log(`Year: ${this.year}`);
    console.log(`Weight: ${this.weight} lbs`);
    console.log(`Top Speed: ${this.topSpeed} mph`);

    this.wheels.forEach((wheel, i) => {
      console.log(
        `Wheel ${i + 1}: ${wheel.getDiameter} inch with a ${wheel.getTireBrand} tire`
      );
    });
  }
}

export default Car;
