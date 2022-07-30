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

let form = document.querySelector("#search-form");
form.addEventListener("submit", inputCity);
