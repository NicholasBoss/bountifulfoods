const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('#weather-desc');
const currTemp = document.querySelector('#temperature');
const currHumid = document.querySelector('#humidity');
const currDate = document.querySelector('#date');

const lon = -117.3339068
const lat = 33.1245833
const apikey = `413936b8ac9583c3c6d84d336fe47165`

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=imperial`

function capatalize(str) {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}

function displayWeather(weatherData){
    const icon = `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`
    const weatherdesc = weatherData.weather[0].description;
    const desc = capatalize(weatherdesc);
    const temperature = weatherData.main.temp.toFixed(0);
    const humidity = weatherData.main.humidity.toFixed(0);
    const date = new Date(weatherData.dt * 1000);

    currDate.innerHTML = `${date.toLocaleString('en-US', {weekday: 'long'})} ${date.toLocaleString('en-US', {month: 'long'})} ${date.toLocaleString('en-US', {day: 'numeric'})},  ${date.toLocaleString('en-US', {year: 'numeric'})}`;
    weatherIcon.setAttribute('src', icon);
    weatherIcon.setAttribute('alt', desc);
    captionDesc.innerHTML = `${desc}`;
    currTemp.innerHTML = `${temperature}`;
    currHumid.innerHTML = `${humidity}`;

}

async function getWeatherData(){
    try {
        const response = await fetch(weatherURL);
        if (response.ok){
            const data = await response.json();
            displayWeather(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

getWeatherData();