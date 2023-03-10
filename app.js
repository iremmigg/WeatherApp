
const API_KEY = 'fab46e445d4c4a9eadd121055231003';


const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const searchElement = document.getElementById("search-bar");
const cityElement = document.getElementsByClassName("city");
const yearElement = document.getElementById("year");
const weatherItemsElement = document.getElementById("weather-items");
const timeDayElement = document.getElementById("time-day");
const countryElement = document.getElementById("country");
const futureWeatherElement = document.getElementById("future-weather");
const todayTempElement = document.getElementById("today-temp");
const formElement = document.getElementById("search")




const days = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const months = ["Ocak", "Şubat", "Mart", " Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos","Eylül", "Ekim", "Kasım", "Aralık"];

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

},1)
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
     let {latitude, longitude } = success.coords;
        fetch(`http://api.weatherapi.com/v1/future.json?key=c1d6ca2aaeed495fbaf131826231003&q=Ankara&dt=2023-04-09`)
        .then(response => response.json())

        .then(data =>{

            console.log(data)
            showWeatherData() ;  
        })
        
        
    })
}

function showWeatherData(data){
    let{humidity, pressure, sunrise, sunset, wind_speed} = data.current;
    timeDayElement.innerHTML = data.timeDayElement;
    countryElement.innerHTML =data.lat + 'N ' + data.lon+'E';

    weatherItemsElement.innerHTML= `
    
    <div class="weather-items" id="weather-items">
        <div>Nem</div>
        <div>${humidity}%</div>
    </div>

    <div class="weather-items" id="weather-items">
        <div>Basınç</div>
         <div>${pressure}</div>
    </div>

    <div class="weather-items" id="weather-items">
        <div>Rüzgar Hızı</div>
         <div>${wind_speed}</div>
    </div>

    <div class="weather-items" id="weather-items">
        <div>Gün Doğuşu</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>

    <div class="weather-items" id="weather-items">
        <div>Gün Batışı</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>

    `;
    
}
getWeatherData()



