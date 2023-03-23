function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayWeatherForecast() {
  let weatherForecastElement = document.querySelector("#weather-forecast");
  let weatherForecastHTML = `<div class="row">`;
  let days = ["Wed", "Thur", "Fri", "Sat", "Sun", "Mon"];
  days.forEach(function (day) {
    weatherForecastHTML =
      weatherForecastHTML +
      `
              <div class="col-2">
                <div class="forecast-day1">${day}</div>
                <img
                  src="https://assets.msn.com/weathermapdata/1/static/weather/Icons/taskbar_v3/Condition_Card/MostlyCloudyNightV2.svg"
                  alt="day1"
                  width="30"
                />
                <div class="forecast-date1">
                  <span class="low1">18</span><span class="large1">-20</span>
                </div>
              </div>
        `;
  });
  weatherForecastHTML = weatherForecastHTML + `</div>`;

  weatherForecastElement.innerHTML = weatherForecastHTML;
}

function getWeatherForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "b7006d8faf9ee2ct6bdd5214o1a3d9fb";
  let query = "lisbon";
  let apiUrl2 = `https://api.shecodes.io/weather/v1/forecast?query=${query}&key=${apiKey}&units=metric`;
  console.log(apiUrl2);
  axios.get(apiUrl2).then(displayWeatherForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#Temp");
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  let cityElement = document.querySelector("#City");
  cityElement.innerHTML = response.data.name;
  let descriptionElement = document.querySelector("#Description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#Wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#Icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getWeatherForecast(response.data.coord);
}

function search(city) {
  let apiKey = "93bee9258cceab16c69bf2803b39b8de";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function result(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", result);

displayWeatherForecast();
