
const KEY = '5e3f26170c0d43ab8ec72732231503';

let srcBtnElement = null;
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
let todayWeatherElement = null;
let air_temperatureElement = null;
let sunriseElemen = null;
let sunsetElement = null;


let days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
let months = ["Ocak", "Şubat", "Mart", " Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];


window.addEventListener('DOMContentLoaded', (event) => {
    timeElement = document.getElementById("time");
    dateElement = document.getElementById("date");
    searchElement = document.getElementById("search-bar");
    srcBtnElement = document.getElementById("src-btn");
    cityElement = document.getElementsByClassName("city");
    yearElement = document.getElementById("year");
    weatherItemsElement = document.getElementById("weather-items");
    timeDayElement = document.getElementById("time_day");
    countryElement = document.getElementById("country");
    weatherForecastElement = document.getElementById("weather-forecast");
    todayTempElement = document.getElementById("today-temp");
    formElement = document.getElementById("search");
    citesElement = document.getElementById("cites");
    todayWeatherElement = document.getElementById("todayWeather");
    air_temperatureElement = document.getElementById("air_temperature");
    sunriseElement = document.getElementById("sunrise");
    sunsetElement = document.getElementById("sunset");

    setInterval(() => {
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
    }, 1);




    getWeatherData();
    srcBtnElement.addEventListener("click", (event) => {
        if (searchElement.value.length === 0) {
            alert('Lütfen Şehir İsmi Giriniz.');
        }
        else {
            getWeatherData(searchElement.value);
        }
        e.preventDefault();
    });

    /*cityElement.addEventListener("click",function clickCity() {
        
        getWeatherData(searchElement.value);
        

    })*/

});










function getWeatherData(location = "Eskisehir") {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);
        let { latitude, longitude } = success.coords;
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=5e3f26170c0d43ab8ec72732231503&q=${location}&days=7`)
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
        longitude: "",
        cityy: "",




    };

    itemsDataJson.humidity = data.current.humidity;
    itemsDataJson.preasure = data.current.pressure_in;
    itemsDataJson.wind_kph = data.current.wind_kph
    itemsDataJson.latitude = data.location.lat;
    itemsDataJson.longitude = data.location.lon;
    itemsDataJson.cityy = data.location.name;






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
    timeDayElement.innerHTML = `
        <div class="time_day" id="time_day">${itemsDataJson.cityy}</div>
    `
    countryElement.innerHTML = `
        <div class="country" id="country">${itemsDataJson.latitude}  "N"  ${itemsDataJson.longitude} "E" </div>
    `


    let otherDayForcast = "";
    let otherDayForcastDataJson = {
        day: "",
        morning: "",
        night: "",
        icon: "",

        sunrise: "",
        sunset: "",

        temp: "",
    };


    data.forecast.forecastday.forEach((day, i) => {

        otherDayForcastDataJson.day = day.date;
        otherDayForcastDataJson.morning = day.day.maxtemp_c;
        otherDayForcastDataJson.night = day.day.mintemp_c;
        otherDayForcastDataJson.icon = day.day.condition.icon;
        otherDayForcastDataJson.sunrise = day.astro.sunrise;
        otherDayForcastDataJson.sunset = day.astro.sunset;
        otherDayForcastDataJson.temp = data.current.temp_c;


        if (i == 0) {

            todayWeatherElement.innerHTML = `
                <div class="air_temperature" id="air_temperature">
                <img src=${otherDayForcastDataJson.icon} alt="weather-icon" class="weather-icon">
                <div>Sıcaklık</div>
                <div>${otherDayForcastDataJson.temp}&#176;C</div>
                </div>

                <div class="sunrise" id="sunrise">
                    <img src=${otherDayForcastDataJson.icon} alt="weather-icon" class="weather-icon">
                    <div>Gün Doğumu</div>
                    <div>${otherDayForcastDataJson.sunrise}</div>
                </div>
                
                <div class="sunset" id="sunset">
                    <img src=${otherDayForcastDataJson.icon} alt="weather-icon" class="weather-icon">
                    <div>Gün Batımı</div>
                    <div>${otherDayForcastDataJson.sunset}</div>
                </div>
    
                `

            todayTempElement.innerHTML = `
            <img src="${otherDayForcastDataJson.icon}" alt="weather-icon" class="weather-icon">
            <div class="other">
                <div class="day">${window.moment(day.date_epoch * 1000).format('ddd')}</div>
                <div class="temp">Gündüz  ${otherDayForcastDataJson.morning}&#176;C</div>
                <div class="temp">Gece  ${otherDayForcastDataJson.night}&#176;C</div>
            </div>
            `
        }
        else {
            otherDayForcast += `
            <div class="weather-forecast" id="weather-forecast">
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.date_epoch * 1000).format('ddd')}</div>
                <img src=${otherDayForcastDataJson.icon} alt="weather-icon" class="weather-icon">
                <div class="temp">Gündüz ${otherDayForcastDataJson.morning}&#176;C</div>
                <div class="temp">Gece ${otherDayForcastDataJson.night}&#176;C</div>
            </div>

            `
        }

        weatherForecastElement.innerHTML = otherDayForcast;



    });




}




