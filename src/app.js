function displayTemperature(response) {
  console.log(response.data);
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
}

let apiKey = "93bee9258cceab16c69bf2803b39b8de";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
