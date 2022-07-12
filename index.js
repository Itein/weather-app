let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let currentDay = days[currentTime.getDay()];
let weekDay = document.querySelector("#day-on-board");
weekDay.innerHTML = currentDay;

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentMonth = months[currentTime.getMonth()];
let monthNow = document.querySelector("#month-on-board");
monthNow.innerHTML = currentMonth;

let currentDate = currentTime.getDate();
let dateNow = document.querySelector("#date-on-board");
dateNow.innerHTML = currentDate;

function hour() {
  let currentHour = currentTime.getHours();
  if (currentHour < 10) currentHour = `0${currentHour}`;
  let hoursNow = document.querySelector("#hours-on-board");
  hoursNow.innerHTML = currentHour;
}
hour();

function minute() {
  let currentMinute = currentTime.getMinutes();
  if (currentMinute < 10) currentMinute = `0${currentMinute}`;
  let minutesNow = document.querySelector("#minutes-on-board");
  minutesNow.innerHTML = currentMinute;
}
minute();
//Start city
function zeroCity(city) {
  let apiKey = "dab72d36ef441c0085acb35134183521";
  let apiZeroPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";

  let apiUrl = `${apiZeroPoint}q=${city}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
zeroCity("Kyiv");
//Geo Location
function userLocationDetector() {
  function userLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "dab72d36ef441c0085acb35134183521";
    let apiZeroPoint = "https://api.openweathermap.org/data/2.5/weather?";
    let units = "metric";
    let url = `${apiZeroPoint}lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
    axios.get(url).then(showWeather);
  }
  navigator.geolocation.getCurrentPosition(userLocation);
}
let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", userLocationDetector);

//City Search
function showWeather(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentTempInUserCity = document.querySelector(".current-temprature");
  currentTempInUserCity.innerHTML = `${currentTemp}°C`;

  let currentWind = Math.round(response.data.wind.speed);
  let currentWindInUserCity = document.querySelector(".wind");
  currentWindInUserCity.innerHTML = `Wind : ${currentWind} m/s`;

  let currentHumidity = response.data.main.humidity;
  let currentHumidityInUserCity = document.querySelector(".humidity");
  currentHumidityInUserCity.innerHTML = `Humidity : ${currentHumidity}%`;

  let currentCity = response.data.name;
  let city = document.querySelector("h1");
  city.innerHTML = currentCity;
}

function citySearch(event) {
  event.preventDefault();
  let searchResult = document.querySelector("#search-input");
  let userCity = searchResult.value;
  let apiKey = "dab72d36ef441c0085acb35134183521";
  let apiZeroPoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";

  let apiUrl = `${apiZeroPoint}q=${userCity}&units=${units}&appid=${apiKey}`;

  axios.get(apiUrl).then(showWeather);
}
let searchForCity = document.querySelector("#search-form");
searchForCity.addEventListener("submit", citySearch);
