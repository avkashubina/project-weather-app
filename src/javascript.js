function getForecast(coordinates) {
  apiKey = "370b3975f0a546c7a8755cf3240ff7fd";
  apiUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showInfo(response) {
  let city = document.querySelector("#city");
  city.innerHTML = response.data.name;

  let temperature = document.querySelector("#degree");
  temperature.innerHTML = Math.round(response.data.main.temp);

  let showDate = document.querySelector("#date");
  let currentDate = new Date();
  let date = currentDate.getDate();
  let months = [
    "Januari",
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
  let month = months[currentDate.getMonth()];
  let hour = currentDate.getHours();
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    showDate.innerHTML = `${date} ${month} |  ${hour}:0${minutes}`;
  } else {
    showDate.innerHTML = `${date} ${month} |  ${hour}:${minutes}`;
  }

  let sky = document.querySelector("#sky");
  sky.innerHTML = response.data.weather[0].main;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);

  let wind = document.querySelector("#wind");
  wind.innerHTML = Math.round(response.data.wind.speed);

  let mainIcon = document.querySelector("#icon");
  mainIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`
  );
  celsius = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function formatCurrentForcast(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function searchCity(city) {
  let apiKey = "370b3975f0a546c7a8755cf3240ff7fd";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showInfo);
}

function inputCity(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-input");
  searchCity(cityInputElement.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let fahrenheitValue = document.querySelector("#degree");

  celsiusValue.classList.remove("active");
  fahrenheitValue.classList.add("active");

  let calculateFahrenheit = (celsius * 9) / 5 + 32;
  fahrenheitValue.innerHTML = Math.round(`${calculateFahrenheit}`);
}

function displayCelsius(event) {
  event.preventDefault();
  let celsiusValue = document.querySelector("#degree");
  celsiusValue.innerHTML = Math.round(celsius);

  celsiusValue.classList.add("active");
  fahrenheitValue.classList.remove("active");
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="future-weather">`;

  forecast.forEach(function (forecast, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<div id="forecast">
        <div class="day">
          <ul class="day-of-week">
            <li class="name-of-day">${formatCurrentForcast(forecast.dt)}</li>
            <li class="weather-forecast-max">${Math.round(
              forecast.temp.max
            )}˚</li>
            <li><img src="http://openweathermap.org/img/wn/${
              forecast.weather[0].icon
            }@2x.png" alt="" width="50"></li>
          </ul>
          </div>
          </div>
          </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;

  forecastElement.innerHTML = forecastHTML;
}

let celsius = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", inputCity);

let fahrenheitValue = document.querySelector("#fahrenheit-value");
fahrenheitValue.addEventListener("click", displayFahrenheit);

let celsiusValue = document.querySelector("#celsius-value");
celsiusValue.addEventListener("click", displayCelsius);

searchCity("Kyiv");
