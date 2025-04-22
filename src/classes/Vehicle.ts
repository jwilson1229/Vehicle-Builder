
export interface Driveable {
  start(): void;
  stop(): void;
  accelerate(change: number): void;
  decelerate(change: number): void;
  turn(direction: string): void;
  reverse(): void;
  printDetails(): void;
}


class Vehicle implements Driveable {
  vin: string;
  make: string;
  model: string;
  started: boolean;
  currentSpeed: number;

  constructor(vin: string, make: string, model: string) {
    this.vin = vin;
    this.make = make;
    this.model = model;
    this.started = false;
    this.currentSpeed = 0;
  }

  printDetails(): void {
    console.log(`VIN: ${this.vin}`);
    console.log(`Make: ${this.make}`);
    console.log(`Model: ${this.model}`);
    console.log(`Vehicle started: ${this.started}`);
    console.log(`Vehicle current speed: ${this.currentSpeed} mph`);
  }

  start(): void {
    this.started = true;
    console.log('Vehicle started');
  }

  accelerate(change: number): void {
    if (this.started) {
      this.currentSpeed += change;
      console.log(`Vehicle accelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  decelerate(change: number): void {
    if (this.started) {
      this.currentSpeed = Math.max(0, this.currentSpeed - change);
      console.log(`Vehicle decelerated to ${this.currentSpeed} mph`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  stop(): void {
    this.currentSpeed = 0;
    this.started = false;
    console.log('Vehicle stopped');
  }

  turn(direction: string): void {
    if (this.started) {
      console.log(`Vehicle turned ${direction}`);
    } else {
      console.log('Start the vehicle first');
    }
  }

  reverse(): void {
    if (this.started) {
      console.log('Vehicle reversed');
    } else {
      console.log('Start the vehicle first');
    }
  }
}

export default Vehicle;
