// Remember, we're gonna use strict mode in all scripts now!
'use strict';

// Forecast temeratures of 1 day, 2 days, and 3 days
const temperatures = [17, 21, 23];

const printForecast = function (arr) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str += `... ${arr[i]}°C in ${i + 1} days `;
  }
  console.log(str);
};

printForecast(temperatures);
