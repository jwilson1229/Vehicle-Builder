
import Vehicle from './Vehicle.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

class Truck extends Vehicle implements AbleToTow {
    towingCapacity: number;
    wheels: Wheel[];

    constructor(
        vin: string,
        color: string,
        make: string,
        model: string,
        year: number,
        weight: number,
        topSpeed: number,
        wheels: Wheel[],
        towingCapacity: number
    ) {
        super(vin, color, make,); 
        this.wheels = wheels.length !== 4 ? [new Wheel(), new Wheel(), new Wheel(), new Wheel()] : wheels;
        this.towingCapacity = towingCapacity;
    }

    tow(vehicle: Vehicle): void {
        console.log(`Towing vehicle with VIN: ${vehicle.vin}`);
    }

    
    override printDetails(): void {
        super.printDetails(); 
        console.log(`Towing Capacity: ${this.towingCapacity} lbs`);
    }
}

export default Truck;
