$(document).ready(function () {
  var geo = navigator.geolocation;
  var icons = {
    "01d": "<i class='wi wi-day-sunny'></i>",
    "02d": "<i class='wi wi-day-cloudy'></i>",
    "03d": "<i class='wi wi-cloud'></i>",
    "04d": "<i class='wi wi-cloudy'></i>",
    "09d": "<i class='wi wi-rain'></i>",
    "10d": "<i class='wi wi-day-rain'></i>",
    "11d": "<i class='wi wi-thunderstorm'></i>",
    "13d": "<i class='wi wi-snow'></i>",
    "50d": "<i class='wi wi-dust'></i>",
    "01n": "<i class='wi wi-night-clear'></i>",
    "02n": "<i class='wi wi-night-alt-cloudy'></i>",
    "03n": "<i class='wi wi-cloud'></i>",
    "04n": "<i class='wi wi-cloudy'></i>",
    "09n": "<i class='wi wi-rain'></i>",
    "10n": "<i class='wi wi-night-alt-rain'></i>",
    "11n": "<i class='wi wi-thunderstorm'></i>",
    "13n": "<i class='wi wi-snow'></i>",
    "50n": "<i class='wi wi-dust'></i>"
  }

  // Initialize location to Manhattan
  getWeather(40.79, -73.97);

  // Get weather for current location
  if (geo) {
    geo.getCurrentPosition(function (position) {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeather(lat, lon);
    });
  }

  let token = "";//process.env.TOKEN;

  function getWeather(lat, lon) {
    let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&APPID=${token}`;

    $.getJSON(url, function (api) {
      let icon = icons[api.weather[0].icon];
      let description = api.weather[0].description;
      let city = api.name.toLowerCase();
      let country = api.sys.country;
      let temp = Math.round(api.main.temp);

      $("#title").html(`L${icon}cal Weather`);
      $("#location").html(`${city}, ${country}`)
      $("#description").html(`${description}`);
      $("#celcius").html(temp);
      $("#fahrenheit").html(Math.round(temp * 9 / 5 + 32));
    });
  }
});