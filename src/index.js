// Challenge 1
let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Sunday"
];
let dates = document.querySelector("#date");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let day = days[now.getDay()];

dates.innerHTML = `${day} ${hours}:${minutes}`;

// Challenge 2

function search(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-city");
  searchCity(cityInput.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function searchCity(city) {
  let apiKey = "60e9b8e93f7104c20384f8e74ed8be82";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial`;

  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}

// Challenge 3 Bonus*

function changeFarenheit(event) {
  event.preventDefault();
  let temp = document.querySelector("span.temp");
  temp.innerHTML = `66`;
}
let farenheit = document.querySelector("#farenheit");
farenheit.addEventListener("click", changeFarenheit);

function changeCelcius(event) {
  event.preventDefault();
  let celTemp = document.querySelector("span.temp");
  celTemp.innerHTML = `19`;
}
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", changeCelcius);

function showTemperature(response) {
  console.log(response.data);
  let city = response.data.name;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${city}`;

  document.querySelector("span.temp").innerHTML = `${Math.round(
    response.data.main.temp
  )}`;
  document.querySelector(
    "#humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
    response.data.wind.speed
  )}km/h`;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}
function currentTemperature(response) {
  console.log(response.data.main.temp);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("span.temp");
  currentTemp.innerHTML = `${temperature}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "60e9b8e93f7104c20384f8e74ed8be82";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(currentTemperature);
}

function displayCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current");
currentLocation.addEventListener("click", displayCurrentLocation);
