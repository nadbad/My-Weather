const api = {
    key: 'e43f64ee98be9268f7a7f49e34aecfdf',
    base: 'https://api.openweathermap.org/data/2.5/'
};

const input = document.getElementById('location');
input.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode === 13) {
        getForecast(input.value);
        input.value = '';
    };

};

function getForecast(query) {
    fetch(`${api.base}forecast/daily?q=${query}&cnt=7&units=metric&appid=${api.key}`)
        .then(forecast => {
            console.log(forecast);
            return forecast.json();
        }).then(renderData);
};

function renderData(forecast) {
    let cityCountry = document.querySelector('.city');
    cityCountry.innerText = `${forecast.city.name}, ${forecast.city.country}`;

    now = new Date();
    let date = document.querySelector('.date')
    date.innerText = dateBuilder(now);

    let weather = document.querySelector('.forecast-info')
    if (weather.innerHTML == '') {
        forecast.list.forEach(day => {
            let iconWeb = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
            let date = new Date(day.dt * 1000);
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let name = days[date.getDay()];
            let dayBlock = document.createElement("div");
            console.log(day)
            dayBlock.className = "day-1";
            dayBlock.innerHTML = `<p class="day-1-day">${name}</p> 
            <img src="${iconWeb}" alt="">
            <p id="info-1">${Math.floor(day.temp.day)}°</p>`;
            weather.appendChild(dayBlock);
        });
        let main = document.querySelector('.main');
        main.style.height = '180vh';
    } else {
        weather.innerHTML = '';
        forecast.list.forEach(day => {
            let iconWeb = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
            let date = new Date(day.dt * 1000);
            let days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            let name = days[date.getDay()];
            let dayBlock = document.createElement("div");
            console.log(day)
            dayBlock.className = "day-1";
            dayBlock.innerHTML = `<p class="day-1-day">${name}</p><img src="${iconWeb}" alt="">
                <p id="info-1">${Math.floor(day.temp.day)}°</p>`;
            weather.appendChild(dayBlock);
        })
        let main = document.querySelector('.main');
        main.style.height = '180vh';
    }

};

function dateBuilder(d) {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
};
