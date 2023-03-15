
const KEY = '5e3f26170c0d43ab8ec72732231503';


let timeElement = null;
let dateElement = null
let searchElement = null;
let cityElement = null;
let yearElement =  null;
let weatherItemsElement =  null;
let timeDayElement =  null;
let countryElement = null;
let futureWeatherElement =  null;
let todayTempElement =  null;
let formElement =  null;
let citesElement = null ;



const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const months = ["Ocak", "Şubat", "Mart", " Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];


window.addEventListener('DOMContentLoaded', (event) => {
   timeElement = document.getElementById("time");
   dateElement = document.getElementById("date");
   searchElement = document.getElementById("search-bar");
   cityElement = document.getElementsByClassName("city");
   yearElement = document.getElementById("year");
   weatherItemsElement = document.getElementById("weather-items");
   timeDayElement = document.getElementById("time_day");
   countryElement = document.getElementById("country");
   futureWeatherElement = document.getElementById("future-weather");
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
    let dataJson = {
        humidity: "",
        sunrise: "",
        sunset: "",
        maxwind_kph: "",

    };

    dataJson.humidity = data.forecast.forecastday[0].day.avghumidity;
    dataJson.maxwind_kph = data.forecast.forecastday[0].day.maxwind_kph;
    dataJson.sunrise = data.forecast.forecastday[0].astro.sunrise;
    dataJson.sunset = data.forecast.forecastday[0].astro.sunset;
    dataJson.latitude = data.location.lat;
    dataJson.longitude = data.location.lon;

    timeDayElement.innerHTML = data.time_day;
    countryElement.innerHTML = data.lat + 'N ' + data.lon+'E';

    citesElement.innerHTML = `
    <div class="weather-items" id="weather-items">
        <div>Nem</div>
        <div>${dataJson.humidity}%</div>
    </div>

    <div class="weather-items" id="weather-items">
        <div>Rüzgar Hızı</div>
         <div>${dataJson.maxwind_kph}</div>
    </div>

    <div class="weather-items" id="weather-items">
        <div>Gün Doğuşu</div>
        <div>${dataJson.sunrise}</div>
    </div>

    <div class="weather-items" id="weather-items">
        <div>Gün Batışı</div>
        <div>${dataJson.sunset}</div>
    </div>

    `;

    data

}




