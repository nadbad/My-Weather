const api = {
    key: '45d492514adc9d96abe99062586e473e',
    base: 'https://api.openweathermap.org/data/2.5/'
}

const input = document.getElementById('location');
input.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode === 13) {
        getWeather(input.value);
        input.value = '';
    };

}

function getWeather(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        }).then(displayWeather);
}

function displayWeather(weather) {
    let city = document.querySelector('.city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelectorAll('p')
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let disc = document.querySelector('.disc');
    disc.innerText = weather.weather[0].main;

    let lowHigh = document.querySelector('.lowHigh');
    lowHigh.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;
}

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
}