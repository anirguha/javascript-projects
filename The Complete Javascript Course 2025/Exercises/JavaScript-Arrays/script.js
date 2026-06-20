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

// const breeds = [
//   {
//     breed: "German Shepherd",
//     averageWeight: 32,
//     activities: ["fetch", "swimming"],
//   },
//   {
//     breed: "Dalmatian",
//     averageWeight: 24,
//     activities: ["running", "fetch", "agility"],
//   },
//   {
//     breed: "Labrador",
//     averageWeight: 28,
//     activities: ["swimming", "fetch"],
//   },
//   {
//     breed: "Beagle",
//     averageWeight: 12,
//     activities: ["digging", "fetch"],
//   },
//   {
//     breed: "Husky",
//     averageWeight: 26,
//     activities: ["running", "agility", "swimming"],
//   },
//   {
//     breed: "Bulldog",
//     averageWeight: 36,
//     activities: ["sleeping"],
//   },
//   {
//     breed: "Poodle",
//     averageWeight: 18,
//     activities: ["agility", "fetch"],
//   },
// ];

// // 1. Store the the average weight of a "Husky" in a variable "huskyWeight"
// const huskyWeight = breeds.find(
//   (breed) => breed.breed == "Husky",
// ).averageWeight;
// console.log(huskyWeight);

// // 2. Find the name of the only breed that likes both "running" and "fetch" ("dogBothActivities" variable)
// const dogBothActivities = breeds.find(
//   (breed) =>
//     breed.activities.includes("running") && breed.activities.includes("fetch"),
// ).breed;
// console.log(dogBothActivities);

// // 3. Create an array "allActivities" of all the activities of all the dog breeds
// // const allActivities = breeds.map((breed) => breed.activities).flat();
// const allActivities = breeds.flatMap((breed) => breed.activities);
// console.log(allActivities);

// // 4. Create an array "uniqueActivities" that contains only the unique activities (no activity repetitions). HINT: Use a technique with a special data structure that we studied a few sections ago.
// const uniqueActivities = [...new Set(allActivities)];
// console.log(uniqueActivities);

// // 5. Many dog breeds like to swim. What other activities do these dogs like? Store all the OTHER activities these breeds like to do, in a unique array called "swimmingAdjacent".
// const swimmingAdjacent = [
//   ...new Set(
//     breeds
//       .filter((breed) => breed.activities.includes("swimming"))
//       .flatMap((breed) => breed.activities)
//       .filter((activity) => activity !== "swimming"),
//   ),
// ];
// console.log(swimmingAdjacent);
// // 6. Do all the breeds have an average weight of 10kg or more? Log to the console whether "true" or "false".
// const allAboveTen = breeds.every((breed) => breed.averageWeight >= 10);
// console.log(allAboveTen);

// // 7. Are there any breeds that are "active"? "Active" means that the dog has 3 or more activities. Log to the console whether "true" or "false".
// const anyActive = breeds.some((breed) => breed.activities.length >= 3);
// console.log(anyActive);

// // BONUS: What's the average weight of the heaviest breed that likes to fetch? HINT: Use the "Math.max" method along with the ... operator.
// const heaviestFetchBreed = Math.max(
//   ...breeds
//     .filter((breed) => breed.activities.includes("fetch"))
//     .map((breed) => breed.averageWeight),
// );
// console.log(heaviestFetchBreed);

// Coding Challenge #5

/* 
Julia and Kate are still studying dogs. This time they are want to figure out if the dogs in their are eating too much or too little food.

- Formula for calculating recommended food portion: recommendedFood = weight ** 0.75 * 28. (The result is in grams of food, and the weight needs to be in kg)
- Eating too much means the dog's current food portion is larger than the recommended portion, and eating too little is the opposite.
- Eating an okay amount means the dog's current food portion is within a range 10% above and below the recommended portion (see hint).

YOUR TASKS:
1. Loop over the array containing dog objects, and for each dog, calculate the recommended food portion (recFood) and add it to the object as a new property. Do NOT create a new array, simply loop over the array (We never did this before, so think about how you can do this without creating a new array).
2. Find Sarah's dog and log to the console whether it's eating too much or too little. HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
3. Create an array containing all owners of dogs who eat too much (ownersTooMuch) and an array with all owners of dogs who eat too little (ownersTooLittle).
4. Log a string to the console for each array created in 3., like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
9. Group the dogs by the number of owners they have
10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!

HINT 1: Use many different tools to solve these challenges, you can use the summary lecture to choose between them 😉
HINT 2: Being within a range 10% above and below the recommended portion means: current > (recommended * 0.90) && current < (recommended * 1.10). Basically, the current portion should be between 90% and 110% of the recommended portion.

TEST DATA:
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John', 'Leo'] },
  { weight: 18, curFood: 244, owners: ['Joe'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

GOOD LUCK 😀
*/
const dogs = [
  { weight: 22, curFood: 250, owners: ["Alice", "Bob"] },
  { weight: 8, curFood: 200, owners: ["Matilda"] },
  { weight: 13, curFood: 275, owners: ["Sarah", "John", "Leo"] },
  { weight: 18, curFood: 244, owners: ["Joe"] }, //Joe
  { weight: 32, curFood: 340, owners: ["Michael"] },
];

// 1. Loop over the array containing dog objects, and for each dog,
// calculate the recommended food portion (recFood) recommendedFood=(weight ** 0.75 * 28) and add it to the object as a new property.
// Do NOT create a new array, simply loop over the array.

dogs.forEach((dog) => (dog.recommendedFood = dog.weight ** 0.75 * 28));

console.log(dogs);

// 2. Find Sarah's dog and log to the console whether it's eating too much or too little.
// HINT: Some dogs have multiple users, so you first need to find Sarah in the owners array, and so this one is a bit tricky (on purpose) 🤓
const sarahDogs = dogs.filter((dog) => dog.owners.includes("Sarah"));

const quantity = sarahDogs.forEach((arr, i) => {
  const quantity =
    arr.curFood < 1.1 * arr.recommendedFood ? "too much" : "too little";
  console.log(`Sarah's dog ${i + 1} is eating ${quantity}`);
});

// 3. Create an array containing all owners of dogs who eat too much (ownersTooMuch)
// and an array with all owners of dogs who eat too little (ownersTooLittle).
const ownersTooMuch = dogs
  .filter((dog) => dog.curFood > 1.1 * dog.recommendedFood)
  .flatMap((dog) => dog.owners);

console.log(ownersTooMuch);

const ownersTooLittle = dogs
  .filter((dog) => dog.curFood < 0.9 * dog.recommendedFood)
  .flatMap((dog) => dog.owners);

console.log(ownersTooLittle);

// 4. Log a string to the console for each array created in 3.,
// like this: "Matilda and Alice and Bob's dogs eat too much!" and "Sarah and John and Michael's dogs eat too little!"
const [ownersRest, owner] = [ownersTooMuch.slice(0, -1), ownersTooMuch.at(-1)];

console.log(`${ownersRest.join(", ")} and ${owner}'s dogs eat too much`);

const [ownersRestLittle, ownerLittle] = [
  ownersTooLittle.slice(0, -1),
  ownersTooLittle.at(-1),
];

console.log(
  `${ownersRestLittle.join(", ")} and ${ownerLittle}'s dogs eat too less`,
);

// 5. Log to the console whether there is ANY dog eating EXACTLY the amount of food that is recommended (just true or false)
console.log(
  dogs.some(
    (dog) =>
      dog.recommendedFood > 0.9 * dog.curFood &&
      dog.recommendedFood < 1.1 * dog.curFood,
  ),
);

// 6. Log to the console whether ALL of the dogs are eating an OKAY amount of food (just true or false)
console.log(dogs.every((dog) => dog.recommendedFood <= 0.9 * dog.curFood));
console.log(dogs.some((dog) => dog.recommendedFood <= 0.9 * dog.curFood));

// 7. Create an array containing the dogs that are eating an OKAY amount of food (try to reuse the condition used in 6.)
const dogsOkFood = dogs.filter(
  (dog) => dog.curFood >= 1.1 * dog.recommendedFood,
);
console.log(dogsOkFood);

// 8. Group the dogs into the following 3 groups: 'exact', 'too-much' and 'too-little', based on whether they are eating too much, too little or the exact amount of food, based on the recommended food portion.
const dogGroups = Object.groupBy(dogs, (dog) => {
  if (dog.curFood > 1.1 * dog.recommendedFood) return "too-much";
  else if (dog.curFood < 0.9 * dog.recommendedFood) return "too-little";
  else return "exact";

  return dog;
});

console.log(dogGroups);

// 9. Group the dogs by the number of owners they have
const dogsByNumberofOwners = Object.groupBy(dogs, (dog) => dog.owners.length);
console.log(dogsByNumberofOwners);

// 10. Sort the dogs array by recommended food portion in an ascending order. Make sure to NOT mutate the original array!
const dogsSorted = dogs.toSorted(
  (a, b) => a.recommendedFood - b.recommendedFood,
);
console.log(dogsSorted);
