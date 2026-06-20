"use strict";
/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀
*/
// Create a function 'checkDogs', which accepts 2 arrays of dog's ages
// ('dogsJulia' and 'dogsKate'), and does the following things:

// 1. Julia found out that the owners of the FIRST and the
// LAST TWO dogs actually have cats, not dogs!
// So create a shallow copy of Julia's array,
// and remove the cat ages from that copied array
// (because it's a bad practice to mutate function parameters)

// 2. Create an array with both Julia's (corrected) and Kate's data
// 3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
// 4. Run the function for both test datasets
// console.log(
//   `\n%c${"-".repeat(20)}Challenge #1${"-".repeat(20)}\n`,
//   "font-weight:bold; font-size:15px",
// );
// const checkDogs = function (dogsJulia, dogsKate) {
//   const dogsJuliaCorrected = dogsJulia.slice(1, -1);
//   console.log(dogsJuliaCorrected);

//   const allDogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(allDogs);

//   allDogs.forEach(function (age, idx) {
//     age >= 3
//       ? console.log(`Dog number ${idx + 1} is of age ${age} and an adult`)
//       : console.log(`Dog number ${idx + 1} is of age ${age} and a puppy`);
//   });

//   return allDogs;
// };

// // const juliaDogs = [3, 5, 2, 12, 7];
// // const kateDogs = [4, 1, 15, 8, 3];
// let juliaDogs = [9, 16, 6, 8, 3];
// let kateDogs = [10, 5, 6, 1, 4];

// checkDogs(juliaDogs, kateDogs);

// console.log(
//   `\n%c${"-".repeat(20)}Challenge #2${"-".repeat(20)}\n`,
//   "font-weight:bold; font-size:15px",
// );

// // const dogs = [5, 2, 4, 1, 15, 8, 3];
// const dogs = [16, 6, 10, 5, 6, 1, 4];

// Calculate human ages for the dogs

// const calHumanAge = dogs.map((age) => (age <= 2 ? 2 * age : 16 + age * 4));

// console.log(calHumanAge);

// //Exclude all dogs that areless than 18 years of human age

// const dogsAdult = calHumanAge.filter((age) => age >= 18);
// console.log(dogsAdult);

// // const dogsAdultAverage =
// // dogsAdult.reduce((sum, age) => sum + age, 0) / dogsAdult.length;

// const dogsAdultAverage = dogsAdult.reduce(
//   (sum, age, _, arr) => sum + age / arr.length,
//   0,
// );

// const dogsAdultAverage = dogs
//   .map((age) => (age <= 2 ? 2 * age : 16 + age * 4))
//   .filter((age) => age >= 18)
//   .reduce((sum, age, _, arr) => sum + age / arr.length, 0);

// console.log(Math.trunc(dogsAdultAverage * 10 ** 2) / 10 ** 2);
// console.log(dogsAdultAverage);

/*
This time, Julia and Kate are studying the activity levels of different dog breeds.

YOUR TASKS:


TEST DATA:
*/

const breeds = [
  {
    breed: "German Shepherd",
    averageWeight: 32,
    activities: ["fetch", "swimming"],
  },
  {
    breed: "Dalmatian",
    averageWeight: 24,
    activities: ["running", "fetch", "agility"],
  },
  {
    breed: "Labrador",
    averageWeight: 28,
    activities: ["swimming", "fetch"],
  },
  {
    breed: "Beagle",
    averageWeight: 12,
    activities: ["digging", "fetch"],
  },
  {
    breed: "Husky",
    averageWeight: 26,
    activities: ["running", "agility", "swimming"],
  },
  {
    breed: "Bulldog",
    averageWeight: 36,
    activities: ["sleeping"],
  },
  {
    breed: "Poodle",
    averageWeight: 18,
    activities: ["agility", "fetch"],
  },
];

// 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
const huskyWeight = breeds.find(
  (breed) => breed.breed == "Husky",
).averageWeight;
console.log(huskyWeight);

// 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
const dogBothActivities = breeds.find(
  (breed) =>
    breed.activities.includes("running") && breed.activities.includes("fetch"),
).breed;
console.log(dogBothActivities);

// 3. Create an array "allActivities" of all the activities of all the dog breeds
// const allActivities = breeds.map((breed) => breed.activities).flat();
const allActivities = breeds.flatMap((breed) => breed.activities);
console.log(allActivities);

// 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
const uniqueActivities = [...new Set(allActivities)];
console.log(uniqueActivities);

// 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
const swimmingAdjacent = [
  ...new Set(
    breeds
      .filter((breed) => breed.activities.includes("swimming"))
      .flatMap((breed) => breed.activities)
      .filter((activity) => activity !== "swimming"),
  ),
];
console.log(swimmingAdjacent);
// 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
const allAboveTen = breeds.every((breed) => breed.averageWeight >= 10);
console.log(allAboveTen);

// 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
const anyActive = breeds.some((breed) => breed.activities.length >= 3);
console.log(anyActive);

// BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
const heaviestFetchBreed = Math.max(
  ...breeds
    .filter((breed) => breed.activities.includes("fetch"))
    .map((breed) => breed.averageWeight),
);
console.log(heaviestFetchBreed);
