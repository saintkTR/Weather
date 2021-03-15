"use strict";

window.addEventListener("load", () => {
  let longi;
  let latti;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let locationIcon = document.querySelector(".weather-icon");
  let newIcon = document.getElementById("icon");

  let temperatureSection = document.querySelector(".temperature");
  const temperatureSpan = document.querySelector(".temperature span");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      longi = position.coords.longitude;
      latti = position.coords.latitude;

      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${latti}&lon=${longi}&appid=abd6c3bb49995d1ecd2398c66545d935`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          // console.log(data);
          const temp = data.main.temp;
          const disc = data.weather[0].description;
          const icon = data.weather[0].icon;

          newIcon.src = `icons/${icon}.png`;

          temperatureDescription.textContent = `Today it's ${disc}`;
          locationTimezone.textContent = data.name;

          let celsius = temp - 273;
          let fahrenheit = celsius * (9 / 5) + 32;

          temperatureDegree.textContent = Math.floor(celsius);

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "°F") {
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = Math.floor(celsius);
            } else {
              temperatureSpan.textContent = "°F";
              temperatureDegree.textContent = Math.floor(fahrenheit);
            }
          });
        });
    });
  } else {
    h1.textContent =
      "In order for this app to work you need to enable your Location!";
  }
});
