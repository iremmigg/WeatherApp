
const KEY = '6237294a99f54ffabab70115230404';

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
let sunriseElement = null;
let sunsetElement = null;
let weatherItemsDayElement = null;
let weatherItemsDay_idElement = null;



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
    weatherItemsDayElement = document.getElementById("weatherItemsDay")
    weatherItemsDay_idElement = document.getElementById("weatherItemsDay_id")

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
            Swal.fire({
                title: "Bu Alan Boş Bırakılamaz",
                text: "Lütfen Bir Şehir İsmi Giriniz !",
                icon: "error",
                buttons: true,
                dangerMode: true,

            })
        }
       

        else {
            getWeatherData(searchElement.value);


        }
        
    });




});



function getWeatherData(location = "Eskisehir") {
    navigator.geolocation.getCurrentPosition((success) => {
        console.log(success);
        let { latitude, longitude } = success.coords;
        fetch(`http://api.weatherapi.com/v1/forecast.json?key=6237294a99f54ffabab70115230404&q=${location}&days=7`)
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
        
        sunrise: "",
        sunset: "",
        
        latitude: "",
        longitude: "",
        cityy: "",

    };

   
    itemsDataJson.latitude = data.location.lat;
    itemsDataJson.longitude = data.location.lon;
    itemsDataJson.cityy = data.location.name;

    timeDayElement.innerHTML = `
        <div class="time_day" id="time_day" >${itemsDataJson.cityy} </div>
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

        feel: "",
        cloud: "",
        snow: "",
        rain: "",
        humidity: "",
        preasure: "",
        wind_kph: "",
    };


    data.forecast.forecastday.forEach((day, i) => {

        otherDayForcastDataJson.day = day.date;
        otherDayForcastDataJson.morning = day.day.maxtemp_c;
        otherDayForcastDataJson.night = day.day.mintemp_c;
        otherDayForcastDataJson.icon = day.day.condition.icon;

        otherDayForcastDataJson.sunrise = day.astro.sunrise;
        otherDayForcastDataJson.sunset = day.astro.sunset;
        otherDayForcastDataJson.temp = data.current.temp_c;

        otherDayForcastDataJson.feel = data.current.feelslike_c;
        otherDayForcastDataJson.cloud = data.current.cloud;
        otherDayForcastDataJson.snow = day.day.daily_chance_of_snow;
        otherDayForcastDataJson.rain = day.day.daily_chance_of_rain;
        otherDayForcastDataJson.humidity = data.current.humidity;
        otherDayForcastDataJson.preasure = data.current.pressure_in;
        otherDayForcastDataJson.wind_kph = data.current.wind_kph;






        if (i == 0) {

            weatherItemsDayElement.innerHTML = `
            <div class="weatherItemsDay_id" id="weatherItemsDay_id">
              <div class="items" id="feelslike"></div>
              <img src="img/feel.png" alt="feel"  width="80" height="80">
              <div class="forecast">Hissedilen Sıcaklık</div>
              <div class="forecast">${otherDayForcastDataJson.feel}&#176;C</div>
            </div>


            <div class="weatherItemsDay_id" id="weatherItemsDay_id">
                <div class="items" id="cloud"></div>
                <img src="img/cloud.png" alt="cloud" width="80" height="80">
                <div class="forecast">Bulutluluk Oranı</div>
                <div class="forecast">${otherDayForcastDataJson.cloud}%</div>
            </div>
    
            <div class="weatherItemsDay_id" id="weatherItemsDay_id">
                <div class="items" id="snow"></div>
                <img src="img/snow.png" alt="snow" width="80" height="80">
                <div class="forecast">Kar Olasılığı</div>
                <div class="forecast">${otherDayForcastDataJson.snow}%</div>
            </div>
            
    
            <div class="weatherItemsDay_id" id="weatherItemsDay_id">
                <div lass="items" id="rain" ></div>
                <img src="img/rain.png" alt="rain" width="80" height="80">
                <div class="forecast">Yağmur Olasılığı</div>
                <div class="forecast">${otherDayForcastDataJson.rain}%</div>
            </div>

             <div class="weatherItemsDay_id" id="weatherItemsDay_id">
                <div class="items" id="feelslike"></div>
                <img src="img/wind.png" alt="feel" width="80" height="80">
                <div class="forecast">Rüzgar Hızı</div>
                <div class="forecast">${otherDayForcastDataJson.wind_kph}</div>
            </div>

            <div class="weatherItemsDay_id" id="weatherItemsDay_id">
                <div class="items" id="feelslike"></div>
                <img src="img/pressure.png" alt="feel" width="80" height="80">
                <div class="forecast">Basınç</div>
                <div class="forecast">${otherDayForcastDataJson.preasure}</div>
            </div>

            <div class="weatherItemsDay_id" id="weatherItemsDay_id">
                <div class="items" id="feelslike"></div>
                <img src="img/humidity.png" alt="feel" width="80" height="80">
                <div class="forecast">Nem Oranı</div>
                <div class="forecast">${otherDayForcastDataJson.humidity}%</div>
            </div>
 
         
         `

            todayWeatherElement.innerHTML = `
                <div class="air_temperature" id="air_temperature">
                    <img src=${otherDayForcastDataJson.icon} alt="weather-icon" class="weather-icon" width="80" height="80">
                    <div>Sıcaklık </div> 
                    <div>${otherDayForcastDataJson.temp}&#176;C</div>
                </div>

                <div class="sunrise" id="sunrise">
                    <img src="img/sunrise.png"alt="weather-icon" class="weather-icon"  width="80" height="80">
                    <div>Gün Doğumu</div>
                    <div>${otherDayForcastDataJson.sunrise}</div>
                </div>
                
                <div class="sunset" id="sunset">
                    <img src="img/sunset.png"  alt="weather-icon" class="weather-icon" width="80" height="80">
                    <div>Gün Batımı </div>
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




