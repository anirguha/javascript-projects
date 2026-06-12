// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// Forecast temeratures of 1 day, 2 days, and 3 days
// const temperatures = [17, 21, 23];
// const temperatures = [12, -5, 5, 0.5, 4, 0, 10, 11, 4, 8];

// const printForecast = function (arr) {
//   let str = '';
//   for (let i = 0; i < arr.length; i++) {
//     str += `... ${arr[i]}°C in ${i + 1} days `;
//   }
//   console.log(str);
// };

// printForecast(temperatures);
const dailyhoursWorked = [7.5, 0, 12, 0, 9, 3];
const daysNames = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

// test if the number of elements in the array exceed 7
try {
  if (dailyhoursWorked.length !== 7) {
    throw new Error('The number of elements in the array must be exactly 7');
  }
} catch (error) {
  console.error(error.message);
}

const calculateAverageWorkHours = function (arr) {
  let totalHours = 0;
  for (let i = 0; i < arr.length; i++) {
    totalHours += arr[i];
  }
  let averageHours = totalHours / arr.length;
  return [totalHours, Math.round(averageHours)];
};

// Number of days worked, i.e. number of days with non-zero hours
const daysWorked = dailyhoursWorked.filter((hours) => hours > 0).length;
console.log(`Number of days worked: ${daysWorked}`);

const [totalHours, avgHours] = calculateAverageWorkHours(dailyhoursWorked);
console.log(`Total hours worked: ${totalHours}`);
console.log(`Average hours worked: ${avgHours}`);
console.log(`Day with the most hours worked: ${Math.max(...dailyhoursWorked)}`);

if (totalHours >= 35) console.log('Worked Fulltime');

// const daysWorked2 = dailyhoursWorked.reduce(
//   (count, hours) => (hours > 0 ? count + 1 : count),
//   0,
// );
// console.log(`Number of days worked (using reduce): ${daysWorked2}`);

// const daysWorked4 = function (arr) {
//   let daysWorked = [];
//   for (let i = 0; i < arr.length; i++) {
//     if (arr[i] > 0) {
//       daysWorked.push(i + 1); // Store the day number (index + 1) in the array
//     }
//   }
//   return daysWorked;
// };
// console.log(
//   `Number of days worked (using for loop): ${daysWorked4(dailyhoursWorked)}`,
// );

const daysWorked4 = dailyhoursWorked.flatMap((hours, index) =>
  hours > 0 ? index + 1 : [],
);
console.log(
  `Days worked (using flatMap): ${daysWorked4.map((day) => daysNames[day - 1]).join(', ')}`,
);

const daysWorked5 = dailyhoursWorked.reduce((days, hours, index) => {
  if (hours > 0) {
    days.push(index + 1); // Store the day number (index + 1) in the array
  }
  return days;
}, []);
console.log(
  `Days worked (using reduce): ${daysWorked5.map((day) => daysNames[day - 1]).join(', ')}`,
);
