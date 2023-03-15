
const KEY = '5e3f26170c0d43ab8ec72732231503';


let timeElement = null;
let dateElement = null
let searchElement = null;
let cityElement = null;
let yearElement = null;
let weatherItemsElement = null;
let timeDayElement = null;
let countryElement = null;
let futureWeatherElement = null;
let todayTempElement = null;
let formElement = null;
let citesElement = null;



let days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
let months = ["Ocak", "Şubat", "Mart", " Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];


window.addEventListener('DOMContentLoaded', (event) => {
    timeElement = document.getElementById("time");
    dateElement = document.getElementById("date");
    searchElement = document.getElementById("search-bar");
    cityElement = document.getElementsByClassName("city");
    yearElement = document.getElementById("year");
    weatherItemsElement = document.getElementById("weather-items");
    timeDayElement = document.getElementById("time_day");
    countryElement = document.getElementById("country");
    weatherForecastElement = document.getElementById("weather-forecast");
    todayTempElement = document.getElementById("today-temp");
    formElement = document.getElementById("search");
    citesElement = document.getElementById("cites");

    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour % 12 : hour;
    const minutes = time.getMinutes();
    const year = time.getFullYear();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeElement.innerHTML = hoursIn12HrFormat + ":" + minutes + `<span id="am-pm">${ampm}</span>`;
    dateElement.innerHTML = days[day] + "," + " " + date + " " + months[month];
    yearElement.innerHTML = year;

    getWeatherData()

});



/*let cityInput = "Ankara";
for (let i = 0; i < cityElement.length; i++) {
    const city = cityElement[i];
    city.addEventListener('click', (e) => {

        cityInput = e.target.innerHTML;
        console.log(cityInput)

        
        
    });
}

formElement.addEventListener('submit', (e) => {
    if (searchElement.value.length === 0) {
        alert('Lütfen Şehir İsmi Giriniz.');
    }
    else {
        cityInput = searchElement.value;

        //fetchWeatherData();

        searchElement.value = "";
    }

    e.preventDefault();

})*/




function getWeatherData() {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);
        let { latitude, longitude } = success.coords;
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=5e3f26170c0d43ab8ec72732231503&q=Eskisehir&days=7&lat=${latitude}&long=${longitude}`)
            .then(response => response.json())
            .then(data => {
                console.log(data)
                showWeatherData(data);
            })
    },
        failure => {
            if (failure.message.startsWith("Only secure origins are allowed")) {

            }
        })
}
function showWeatherData(data) {
    let itemsDataJson = {
        humidity: "",
        preasure: "",
        sunrise: "",
        sunset: "",
        wind_kph: "",
        latitude: "",
        longitude: ""

    };

    itemsDataJson.humidity = data.current.humidity;
    itemsDataJson.preasure = data.current.pressure_in;
    itemsDataJson.wind_kph = data.current.wind_kph
    itemsDataJson.latitude = data.location.lat;
    itemsDataJson.longitude = data.location.lon;



    citesElement.innerHTML = `
    <div class="weather-items" id="weather-items">
        <div>Nem</div>
        <div>${itemsDataJson.humidity}%</div>
    </div>

    <div class="weather-items" id="weather-items">
    <div>Basınç</div>
    <div>${itemsDataJson.preasure}</div>
    </div>  

    <div class="weather-items" id="weather-items">
        <div>Rüzgar Hızı</div>
         <div>${itemsDataJson.wind_kph}</div>
    </div>



    `;

    let otherDayForcast = "";
    let otherDayForcastDataJson = {
        day:"",
        morning: "",
        night: "",
        icon: ""
    };


    data.forecast.forecastday.forEach((day, i) => {
        otherDayForcastDataJson.day = data.forecast.forecastday[i].date;
        otherDayForcastDataJson.morning = data.forecast.forecastday[i].day.maxtemp_c;
        otherDayForcastDataJson.night = data.forecast.forecastday[i].day.mintemp_c;
        otherDayForcastDataJson.icon = data.forecast.forecastday[i].day.condition.icon;

        if (i == 0) {
            todayTempElement.innerHTML = `
            <img src="${otherDayForcastDataJson.icon}" alt="weather-icon" class="weather-icon">
            <div class="other">
                <div class="day"></div>
                <div class="temp">Gündüz -${otherDayForcastDataJson.morning}&#176;C</div>
                <div class="temp">Gece -${otherDayForcastDataJson.night}&#176;C</div>
            </div>
            `
        }
        else {
            otherDayForcast += `
            <div class="weather-forecast" id="weather-forecast">
            <div class="weather-forecast-item">
                <div class="day"></div>
                <img src=${otherDayForcastDataJson.icon} alt="weather-icon" class="weather-icon">
                <div class="temp">Gündüz -${otherDayForcastDataJson.morning}&#176;C</div>
                <div class="temp">Gece -${otherDayForcastDataJson.night}&#176;C</div>
            </div>

            `
        }

        weatherForecastElement.innerHTML = otherDayForcast;



    });




}




