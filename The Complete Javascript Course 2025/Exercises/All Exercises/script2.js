'use strict';

function greet(name) {
  console.log(this);
  const wave = `Hello my name is ${this}`;
  return wave;
}

const address = greet.bind('Alice')();

console.log(address);
