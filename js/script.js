$(document).ready(function () {
  let geo = navigator.geolocation;
  let output = document.getElementById("output");
  
  // Get weather for current location
  if (geo) {
    geo.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }

  let query = document.getElementById("query");
  let submitButton = document.getElementById("submit-button");

  submitButton.addEventListener("click", () => {
    getLatLon(query.value);
  });

  query.addEventListener("keydown", (key) => {
    if (key.code === "Enter") {
      getLatLon(query.value);
    }
  });

  function getLatLon(city) {
    let url = `https://nominatim.openstreetmap.org/search.php?q=${city}&format=jsonv2`;

    $.getJSON(url, (data) => {
      let lat = data[0].lat;
      let lon = data[0].lon;

      getForecastURL(lat, lon);
    });
  }

  function getForecastURL(lat, lon) {
    let url = `https://api.weather.gov/points/${lat},${lon}`;

    $.getJSON(url, (data) => {
      getWeather(data.properties.forecast);
    });
  }

  function getWeather(url) {
    $.getJSON(url, (data) => {
      let periods = data.properties.periods;

      output.innerHTML = "";

      for (let i = 0; i < periods.length; i++) {
        let period = data.properties.periods[i];
        let name = period.name;
        let forecast = period.detailedForecast;
        let icon = period.icon;

        output.innerHTML += `
          <hstack spacing=s align-y=top>
          <img src="${icon}">
          <p>
            <b><u>${name}</u></b><br>
            <span>${forecast}</span><br>
          </p>
          </hstack>
        `;
      }
    });
  }
});