'use strict';

/* const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
// https://restcountries.com/v5.0/name/portugal

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
// Using Open-Meteo Weather API (has CORS enabled)
// Fetch weather data for a location as an example of AJAX
// Clean query parameter URL that avoids complex preflight header checks
// Correct V5 Endpoint Pattern: base path + ?q=country + &api-key=yourkey
// fetch('https://api.restcountries.com/countries/v5?q=canada', {
//   headers: { Authorization: 'Bearer rc_live_57d5239ce2f2428d848e9c76d305ae7f' },
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });

// const request = new XMLHttpRequest();
// const url = 'https://api.restcountries.com/countries/v5?q=canada',
// fetch('https://api.restcountries.com/countries/v5?q=canada', {
// fetch('https://api.restcountries.com/countries/v5?q=canada', {
//   headers: { Authorization: 'Bearer rc_live_57d5239ce2f2428d848e9c76d305ae7f' },
// })
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//     console.log(data);
//   });
/////////////////////////////////////////////////////////////////////////////////////////
// const getCountryData = function (countryName) {
//   const request = new XMLHttpRequest();
//   request.open(
//     'GET',
//     `https://api.restcountries.com/countries/v5/names.common/${countryName}`
//   );
//   request.setRequestHeader(
//     'Authorization',
//     'rc_live_57d5239ce2f2428d848e9c76d305ae7f'
//   );
//   request.send();

const renderCountry = function (country, className = '') {
  const flagUrl = country.flags?.png || country.flag;
  const countryName = country.name?.common || country.name;
  const languages = country.languages
    ? country.languages.map((lang) => lang.name).join(', ')
    : 'N/A';
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => c.name)
        .join(', ')
    : 'N/A';

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${country.flags.svg}" onerror="this.onerror=null; this.src=${country.flags.png}" />
    <div class="country__data">
      <h3 class="country__name">${countryName}</h3>
      <h4 class="country__region">${country.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +country.population /
        10 ** 9
      ).toFixed(4)} Bn people</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${currencies}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderErr = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

const getJSON = function (url, msg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${msg}: ${response.status}`);

    return response.json();
  });
};

const getCountryData = function (country) {
  getJSON(`https://countries.dev/name/${country}`, `${country} not found`)
    .then((data) => {
      const country1 = data.find(
        (c) => c.name.toLowerCase().trim() === country.toLowerCase().trim()
      );
      if (!country1) throw new Error('Country not found');

      renderCountry(country1);

      const neighbour = country1.borders?.[0];
      if (!neighbour) return;
      return getJSON(
        `https://countries.dev/alpha/${neighbour}`,
        `Neighbour not found: ${neighbour}`
      );
    })
    .then((data) => renderCountry(data, 'neighbour'))
    .catch((err) => {
      console.error(`${err} 💥`);
      renderErr(`Something went wrong 💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

const whereAmI = async (coords) => {
  const [lat, lng] = coords;

  const geoURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  const response = await fetch(geoURL);
  if (!response.ok) throw new Error(`GeoEncoding failed: ${response.status}`);

  const data = await response.json();
  console.log(`You're in ${data.city}, ${data.countryName}`);

  return data.countryName;
};

// btn.addEventListener('click', function () {
//   const countryName = whereAmI([19.037, 72.873]);
//   console.log(countryName);
//   getCountryData(countryName);
// });

btn.addEventListener('click', async function () {
  try {
    const countryName = await whereAmI([-33.933, 18.474]);
    getCountryData(countryName); // now receives the string, not a promise
  } catch (err) {
    console.error(err);
  }
}); */ // constAustraliaame = 'India';
// getCountryData(countryName);

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

////////////////////////////////////////////////////////////////////
// Coding Challenge #2

/* 
Build the image loading functionality that I just showed you on the screen.

Tasks are not super-descriptive this time, so that you can figure out some stuff on your own. Pretend you're working on your own 😉

PART 1



If this part is too tricky for you, just watch the first part of the solution.

PART 2
2. Comsume the promise using .then and also add an error handler;


5. After the second image has loaded, pause execution for 2 seconds again;
6. After the 2 seconds have passed, hide the current image.

TEST DATA: Images in the img folder. Test the error handler by passing a wrong image path. Set the network speed to 'Fast 3G' in the dev tools Network tab, otherwise images load too fast.

GOOD LUCK 😀
*/

/* 1. Create a function 'createImage' which receives imgPath as an input. 
This function returns a promise which creates a new image (use document.createElement('img')) 
and sets the .src attribute to the provided image path. 
When the image is done loading, append it to the DOM element with the 'images' class, and resolve the promise. 
The fulfilled value should be the image element itself. In case there is an error loading the image ('error' event), reject the promise. */

// const wait = function (seconds) {
//   return new Promise(function (resolve) {
//     setTimeout(resolve, seconds * 1000);
//   });
// };
// let currentImage;

// const createImage = function (imgPath) {
//   return new Promise(function (resolve, reject) {
//     const img = document.createElement('img');
//     img.src = imgPath;

//     img.addEventListener('load', function () {
//       document.querySelector('.images').appendChild(img);
//       resolve(img);
//     });

//     img.addEventListener('error', function () {
//       reject(new Error('Image not found'));
//     });
//   });
// };

// /* 2. Comsume the promise using .then and also add an error handler */
// createImage('img/img-1.jpg')
//   .then((img) => {
//     console.log('Image 1 loaded');
//     currentImage = img;
//     return wait(2).then(() => {
//       img.style.display = 'none';
//       return createImage('img/img-2.jpg');
//     });
//   })
//   .then((img) => {
//     console.log('Image 2 loaded');
//     return wait(2).then(() => {
//       img.style.display = 'none';
//     });
//   })
//   .catch((err) => {
//     console.error(err);
//   });

/* 3. After the image has loaded, pause execution for 2 seconds using the wait function we created earlier; */

/* 4. After the 2 seconds have passed, hide the current image (set display to 'none'), and load a second image (HINT: Use the image element returned by the createImage promise to hide the current image. You will need a global variable for that 😉); */
// const imgContainer = document.querySelector('.images');
// let currentImage;

// /* 5. After the second image has loaded, pause execution for 2 seconds again; */
// /* 6. After the 2 seconds have passed, hide the current image. */

// Using Async/ Await functionality to handle asynchronous callbacks (uses Promises in the background)

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (country, className = '') {
  const flagUrl = country.flags?.svg || country.flags?.png || '';
  const countryName = country.name || country.name;
  const languages = country.languages
    ? country.languages.map((lang) => lang.name).join(', ')
    : 'N/A';
  const currencies = Array.isArray(country.currencies)
    ? country.currencies.map((c) => c.name).join(', ')
    : 'N/A';

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${flagUrl}" />
    <div class="country__data">
      <h3 class="country__name">${countryName}</h3>
      <h4 class="country__region">${country.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +country.population /
        10 ** 9
      ).toFixed(4)} Bn people</p>
      <p class="country__row"><span>🗣️</span>${languages}</p>
      <p class="country__row"><span>💰</span>${currencies}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const getGeoLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const resolveGeoLocation = async (coords) => {
  const { latitude: lat, longitude: lng } = coords;

  const geoURL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
  const response = await fetch(geoURL);
  if (!response.ok) throw new Error(`GeoEncoding failed: ${response.status}`);

  const data = await response.json();
  console.log(`You're in ${data.city}, ${data.countryName}`);

  return data.countryName;
};

const whereAmI = async () => {
  try {
    const coord = await getGeoLocation();

    const country = await resolveGeoLocation(coord);

    const response = await fetch(`https://countries.dev/name/${country}`);
    if (!response.ok) throw new Error('Country data not found');

    const data = await response.json();
    const country1 = data.find(
      (c) => c.name.toLowerCase().trim() === country.toLowerCase().trim()
    );
    renderCountry(country1);
  } catch (err) {
    `${err.message}❌`;
  } finally {
    console.log('First');
  }
};

// whereAmI('India');
// whereAmI();
// console.log('First');
/* Promise.any([
  Promise.resolve('Success'),
  Promise.reject('Failed'),
  Promise.resolve('2nd Success'),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('Failed'),
  Promise.resolve('2nd Success'),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err));

Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('Failed'),
  Promise.resolve('2nd Success'),
])
  .then((res) => console.log(res))
  .catch((err) => console.log(err)); */

//////////////////////////////////////////////
////Challenge -3///////////////////////
//
const imgPath = ['img/img-3.jpg'];
const ImageContainer = document.querySelector('.images');

let currentImg;

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const createImage = function (imgPath) {
  return new Promise(function (resolve, reject) {
    const img = document.createElement('img');
    img.src = imgPath;

    img.addEventListener('load', function () {
      document.querySelector('.images').appendChild(img);
      resolve(img);
    });

    img.addEventListener('error', function () {
      reject(new Error('Image not found'));
    });
  });
};

const loadNPause = async function () {
  try {
    // Load Image - 1
    currentImg = await createImage('img/img-1.jpg');
    console.log('Image 1 loaded');
    await wait(2);
    currentImg.style.display = 'none';

    // Load Image - 2
    currentImg = await createImage('img/img-2.jpg');
    console.log('Image 2 loaded');
    await wait(2);
    currentImg.style.display = 'none';

    // Load Image - 3
    currentImg = await createImage('img/img-3.jpg');
    console.log('Image 3 loaded');
    await wait(2);
    currentImg.style.display = 'none';
  } catch (e) {
    console.log(`Image cannot be loaded: ${e.message}`);
  }
};

// loadNPause();
const loadAll = async function (imgArr) {
  try {
    const imgs = imgArr.map(async (img) => await createImage(img));
    console.log(imgs);

    const imageElements = await Promise.all(imgs);
    console.log(imageElements);

    imageElements.forEach((img) => img.classList.add('parallel'));
    return imgs;
  } catch {
    console.error('Image Load Failed');
  }
};

const imgArr = ['img/img-1.jpg', 'img/img-2.jpg', 'img/img-3.jpg'];

loadAll(imgArr);
