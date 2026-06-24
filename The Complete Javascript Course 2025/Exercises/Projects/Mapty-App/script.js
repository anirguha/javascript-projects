'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

// Random number generator function (used to create IDs)
const randInt = (min, max) => {
  if (min > max) {
    console.log('Invalid input: min cannot be greater than max');
    return;
  }
  if (min < 0 || max < 0) {
    console.log('min or max cannot be negative');
    return;
  }

  return Math.floor(min + Math.random() * (max - min) + 1);
};

// Class for Workout
class Workout {
  id = randInt(100000, 999999);
  date = new Date();
  clicks = 0;

  constructor(coords, distance, duration) {
    this.coords = coords;
    this.distance = distance;
    this.duration = duration;
  }

  increaseClicks() {
    this.clicks++;
  }
}

// Class for Running (inherits from Workout)
class Running extends Workout {
  type = 'running';
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
  }

  calcPace() {
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}

// Class for Cycling (inherits from Workout)
class Cycling extends Workout {
  type = 'cycling';
  constructor(coords, distance, duration, elevGain) {
    super(coords, distance, duration);
    this.elevGain = elevGain;
    this.calcSpeed();
  }

  calcSpeed() {
    this.speed = this.distance / (this.duration * 60);
    return this.speed;
  }
}

// Class for the App
class App {
  #mapE;
  #map;
  #workout = [];
  #mapZoomLevel = 13;
  constructor() {
    this._getLocalStorage();
    this._getPosition();
    form.addEventListener('submit', this._newWorkout.bind(this));
    inputType.addEventListener('change', this._toggleElevationField);
    containerWorkouts.addEventListener('click', this._moveToPopup.bind(this));
  }

  //Method to get the Geo Position
  _getPosition() {
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function (error) {
          console.error('Geolocation error:', error);
          alert('Location could not be determined' + error.message);
        }
      );
    else console.log('Geolocation is not available on your browser');
  }

  // Method to load the map on the browser
  _loadMap(position) {
    const { latitude, longitude } = position.coords;

    const coords = [latitude, longitude];

    this.#map = L.map('map').setView(coords, this.#mapZoomLevel); //parameters:(coordinates - latitude/ longitude; zoom level)

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on('click', this._showForm.bind(this));

    this.#workout.forEach((workout) => this._renderWorkoutMarker(workout));
  }

  // Method to show the form
  _showForm(mapEvent) {
    this.#mapE = mapEvent;
    form.classList.remove('hidden');
    inputDistance.focus();
  }

  _hideForm() {
    inputDistance.value =
      inputDuration.value =
      inputCadence.value =
      inputElevation.value =
        '';
    form.style.display = 'none';
    form.classList.add('hidden');
    setTimeout(() => (form.style.display = 'grid'), 1000);
  }

  // Method to toggle the Cadence/Elevation field based on the form dropdown (Running/ Cycling)
  _toggleElevationField() {
    inputElevation.closest('.form__row').classList.toggle('form__row--hidden');
    inputCadence.closest('.form__row').classList.toggle('form__row--hidden');
  }

  // Method to show a popup on the map once the form is filled.
  _newWorkout(e) {
    e.preventDefault();

    const validateInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp) && inp > 0);

    // Get the inputs from the form fields
    const distance = +inputDistance.value;
    const duration = +inputDuration.value;
    const cadence = +inputCadence.value;
    const elevation = +inputElevation.value;
    const type = inputType.value;
    const { lat, lng } = this.#mapE.latlng;

    let workout;

    if (type === 'running') {
      if (!validateInputs(distance, duration, cadence))
        return alert('Please enter a valid positive number');
      workout = new Running([lat, lng], distance, duration, cadence);
      workout.name = 'Running';
    }

    if (type === 'cycling') {
      if (!validateInputs(distance, duration))
        return alert('Please enter valid positive numbers');
      workout = new Cycling([lat, lng], distance, duration, elevation);
      workout.name = 'Cycling';
    }
    this.#workout.push(workout);

    // Clear the form fields
    this._hideForm();

    inputDistance.focus();

    this._renderWorkoutMarker(workout);

    this._renderWorkout(workout);

    // Add workout to local storage
    this._setLocalStorage();
  }

  _formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  }

  _setDescription(workout) {
    return `${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.name} on ${this._formatDate(workout.date)}`;
  }

  _renderWorkoutMarker(workout) {
    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 200,
          autoClose: false,
          closeOnClick: false,
          className: 'running-popup',
        })
      )
      .setPopupContent(`${this._setDescription(workout)}`)
      .openPopup();
  }

  _renderWorkout(workout) {
    let html = `<li class="workout workout--${workout.type}" data-id="${workout.id}">
          <h2 class="workout__title">${this._setDescription(workout)}</h2>
          <div class="workout__details">
            <span class="workout__icon">${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'}</span>
            <span class="workout__value">${workout.distance}</span>
            <span class="workout__unit">km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⏱</span>
            <span class="workout__value">${workout.duration}</span>
            <span class="workout__unit">min</span>
          </div>`;

    if (workout.type === 'running') {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(2)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }
    if (workout.type === 'cycling') {
      html += `
      <div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(2)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }

    containerWorkouts.insertAdjacentHTML('beforeend', html);
  }
  _moveToPopup(e) {
    const workEl = e.target.closest('.workout');

    if (!workEl) return;

    const wout = this.#workout.find((w) => w.id === Number(workEl.dataset.id));

    this.#map.setView(wout.coords, this.#mapZoomLevel, {
      animate: true,
      pan: { duration: 1 },
    });
    wout.increaseClicks();
    this._setLocalStorage();
  }
  _setLocalStorage() {
    localStorage.setItem('workouts', JSON.stringify(this.#workout));
  }

  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('workouts'));

    if (!data) return;

    const workouts = Array.isArray(data) ? data : [data];

    this.#workout = workouts.map((workout) => {
      let restoredWorkout;

      if (workout.type === 'running') {
        restoredWorkout = new Running(
          workout.coords,
          workout.distance,
          workout.duration,
          workout.cadence
        );
      }

      if (workout.type === 'cycling') {
        restoredWorkout = new Cycling(
          workout.coords,
          workout.distance,
          workout.duration,
          workout.elevGain
        );
      }

      restoredWorkout.id = workout.id;
      restoredWorkout.date = new Date(workout.date);
      restoredWorkout.clicks = workout.clicks ?? 0;
      restoredWorkout.name = workout.name;

      return restoredWorkout;
    });

    this.#workout.forEach((workout) => {
      this._renderWorkout(workout);
    });
  }
  reset() {
    localStorage.removeItem('workouts');
    location.reload();
  }
}

const app = new App();
