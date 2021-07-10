const API_KEY = config.API_KEY

function onGeoOk(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector(".weather span:first-child")
      const city = document.querySelector(".weather span:last-child")
      city.innerText = data.name;
      weather.innerHTML = `${data.weather[0].main} / ${data.main.temp}&#8451`;

    })

}

function onGeoError(){
  alert("Can't find you. No weater for you.");
}
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);