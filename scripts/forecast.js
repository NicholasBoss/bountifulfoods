const flon = -117.3339068
const flat = 33.1245833
const fapikey = `413936b8ac9583c3c6d84d336fe47165`
const forcasturl = `https://api.openweathermap.org/data/2.5/forecast?lat=${flat}&lon=${flon}&appid=${fapikey}&units=imperial`

const ONE_DAY = 24 * 60 * 60 * 1000

function displayForecast(forecastData){
    // get weather forecast for three days based on the current date and find the current condition at 09:00:00
    let dates = []
    let mydate = new Date();
    for (let i=0; i < 3; i++){
        mydate = new Date(mydate.getTime() + ONE_DAY)
        nextdate = mydate.toISOString().slice(0, 10)
        dates.push(nextdate)
    }
    
    // filter for 09:00:00
    const filteredData = forecastData.filter(x => x.dt_txt.endsWith("09:00:00"))
    
    function capatalize(str) {
        const lower = str.toLowerCase();
        return str.charAt(0).toUpperCase() + lower.slice(1);
    }

    // find the current condition at 09:00:00 per day
    currentCondition = dates.map((date) => filteredData
        .filter(x => x.dt_txt.startsWith(date))
    )
    

    // Add the forecast information to the HTML document
    weatherElt = document.querySelector("body .forecast .days")
    for (let i=0; i < 3; i++){
        let dayElt = document.createElement("div")
        dayElt.classList.add("day")
        let dateElt = document.createElement("h3")
        let mydate = new Date(currentCondition[i][0].dt_txt)
        const newdate = `${mydate.toLocaleString('en-US', {weekday: 'long'})} ${mydate.toLocaleString('en-US', {month: 'long'})} ${mydate.toLocaleString('en-US', {day: 'numeric'})}, ${mydate.toLocaleString('en-US', {year: 'numeric'})}, ${mydate.toLocaleString('en-US', {hour: 'numeric'})}`
        dateElt.textContent = newdate
        let tempElt = document.createElement("p")
        tempElt.textContent = `Temp: ${currentCondition[i][0].main.temp.toFixed(0)}°F`
        let descElt = document.createElement("p")
        let desc = capatalize(currentCondition[i][0].weather[0].description)
        descElt.textContent = `${desc}`
        let iconElt = document.createElement("img")
        iconElt.setAttribute("src", `https://openweathermap.org/img/w/${currentCondition[i][0].weather[0].icon}.png`)
        iconElt.setAttribute("alt", currentCondition[i][0].weather[0].description)
        dayElt.appendChild(dateElt)
        dayElt.appendChild(tempElt)
        dayElt.appendChild(descElt)
        dayElt.appendChild(iconElt)
        weatherElt.appendChild(dayElt)
    }

}

async function getForcastData(){
    try {
        const response = await fetch(forcasturl);
        if (response.ok){
            const fdata = await response.json();
            displayForecast(fdata.list);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

getForcastData();