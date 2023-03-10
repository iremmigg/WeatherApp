
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




function fetchWeatherData() {
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=fab46e445d4c4a9eadd121055231003&q=Ankara&days=7&aqi=no&alerts=no`)
    .then(response => response.json())

    .then(data => console.log(data))
    .catch(err => console.log(err)); 
    showWeatherData() ;  
    
}

function showWeatherData(data){

}

fetchWeatherData()
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



