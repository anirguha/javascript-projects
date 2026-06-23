'use strict';
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
// console.log(
//   '%c-----------Coding Challenge # 1----------',
//   'font-weight:bold;font-size:15px'
// );

// // 1. Use a constructor function to implement a Car.
// // A car has a make and a speed property. The speed property is the current speed of the car in km/h;

// class Car {
//   constructor(make, speed) {
//     this.make = make;
//     this.speed = speed;
//   }
//   // 2. Implement an 'accelerate' method that will
//   // increase the car's speed by 10,
//   // and log the new speed to the console;
//   accelerate(speed) {
//     this.speed += 10;
//     console.log(this.speed);
//   }
//   // 3. Implement a 'brake' method that will decrease
//   // the car's speed by 5, and log the new speed to the console;
//   brake() {
//     this.speed -= 5;
//     console.log(this.speed);
//   }
// }

// const bmw = new Car('BMW', 120);
// const mercedes = new Car('Mercedes', 95);

// bmw.accelerate();
// bmw.brake();

// mercedes.accelerate();
// mercedes.brake();

// console.log(bmw.__proto__);

// Coding Challenge #2

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
// console.log(
('%c-----------Coding Challenge # 2----------',
  'font-weight:bold;font-size:15px');
// );

// // class Car {
// //   constructor(make, speed) {
// //     this.make = make;
// //     this.speed = speed;
// //   }
// //   accelerate() {
// //     this.speed += 10;
// //     console.log(`${this.make} runs at ${this.speed}`);
// //   }

// //   brake() {
// //     this.speed -= 5;
// //     console.log(`${this.make} runs at ${this.speed}`);
// //   }

// //   get speedUS() {
// //     return this.speed / 1.6;
// //   }

// //   set speedUS(speed) {
// //     this.speed = speed * 1.6;
// //   }
// // }

// // const bmw = new Car('BMW', 120);
// // const mercedes = new Car('Mercedes', 95);

// // bmw.accelerate();
// // bmw.accelerate();
// // bmw.accelerate();
// // bmw.brake();

// // mercedes.accelerate();
// // mercedes.accelerate();
// // mercedes.accelerate();
// // mercedes.brake();

// // const toyota = new Car('TOYOTA', 150);
// // console.log('Toyota Speed in MPH', toyota.speedUS);

// // toyota.speedUS = 200;
// // console.log('Toyota Speed in MPH', toyota.speedUS);
// // console.log('Toyota Speed in km/h', toyota.speed);

// // console.log('BMW speed in MPH', bmw.speedUS);
// // bmw.accelerate();

// function Person(firstName, birthYear) {
//   console.log('1.', this);
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// }

// Person.prototype.age = function () {
//   console.log('2.', this);
//   this.age = 2037 - this.birthYear;
//   return this.age;
// };

// function Student(firstName, birthYear, course) {
//   console.log('3.', this);
//   Person.bind(this, firstName, birthYear)();
//   this.course = course;
// }

// Student.prototype = Object.create(Person.prototype);

// console.log(Student.prototype);

// Student.prototype.greet = function () {
//   return `My name is ${this.firstName} and I study ${this.course}`;
// };
// const mike = new Person('Mike', 1992);
// console.log(mike);
// console.log(mike.birthYear);
// console.log(mike.age());

// const john = new Student('John', 2020, 'Science');

// // console.log('My name is', john.firstName, 'and I study', john.course);

// console.log(john.greet());
// console.log(john.age());

console.log(
  '%c-----------Coding Challenge # 3----------',
  'font-weight:bold;font-size:15px'
);

const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  return (this.speed += 10);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.make} is going at ${this.speed} km/hr.`);
  return this.speed;
};

const bmw = new Car('BMW', 140);
console.log(bmw.accelerate());

function EV(make, speed, charge) {
  Car.call(this, make, speed);
  this.charge = charge;
}

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeTo = function (chargeTo) {
  this.charge = chargeTo;
};

EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge *= 0.99;
  console.log(
    `${this.make} is going at ${this.speed} Km/hr, with a charge of ${this.charge}`
  );
};

const tesla = new EV('Telsa', 140);
tesla.chargeTo(25);
tesla.accelerate();
tesla.brake();

const honda = new EV('Honda', 140, 30);
honda.accelerate();
honda.brake();

console.log(
  '%c-----------Coding Challenge # 4----------',
  'font-weight:bold;font-size:15px'
);
class CarcL {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
  }

  brake() {
    this.speed -= 5;
    console.log(`${this.make} is going at ${this.speed} km/hr of speed`);
    return this;
  }
}

class EVcL extends CarcL {
  #charge;
  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    console.log(`${this.make} has ${Math.trunc(this.#charge * 100)} of charge`);
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge *= 0.99;
    console.log(
      `${this.make} is going at ${this.speed} km/hr with ${Math.trunc(this.#charge * 100)}% of charge`
    );
    return this;
  }
}

const rivian = new EVcL('Rivian', 120, 0.23);

const data1 = rivian.accelerate().chargeBattery(50).brake();

console.log(data1);
