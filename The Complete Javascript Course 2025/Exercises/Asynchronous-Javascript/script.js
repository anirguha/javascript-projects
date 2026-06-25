'use strict';

const btn = document.querySelector('.btn-country');
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
const getCountryData = function (countryName) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://api.restcountries.com/countries/v5/names.common/${countryName}`
  );
  request.setRequestHeader(
    'Authorization',
    'rc_live_57d5239ce2f2428d848e9c76d305ae7f'
  );
  request.send();

  request.addEventListener('load', function () {
    const { data: { objects = [] } = {} } = JSON.parse(this.responseText);
    if (!objects.length) return;
    const [country] = objects;
    //   console.log(country);

    const html = `
    <article class="country">
            <img class="country__img" src="${country.flag.url_png}" />
            <div class="country__data">
              <h3 class="country__name">${country.names.common}</h3>
              <h4 class="country__region">${country.region}</h4>
              <p class="country__row"><span>👫</span>${(+country.population / 10 ** 9).toFixed(3)} Bn people</p>
              <p class="country__row"><span>🗣️</span>${country.languages[0].name}</p>
              <p class="country__row"><span>💰</span>${country.currencies[0].name}</p>
            </div>
          </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('China');
getCountryData('France');
getCountryData('India');
