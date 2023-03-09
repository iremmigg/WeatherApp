const timeElement = document.getElementById("time");
const dateElement = document.getElementById("date");
const yearElement =document.getElementById("year");
const weatherItemsElement = document.getElementById("weather-items");
const timeDayElement = document.getElementById("time-day");
const countryElement = document.getElementById("country");
const futureWeatherElement = document.getElementById ("future-weather");
const todayTempElement = document.getElementById("today-temp");

const days = ["Pazartesi","Salı","Çarşamba","Perşembe","Cuma","Cumartesi","Pazar"];
const months = ["Ocak","Şubat","Mart", " Nisan" , "Mayıs" ,"Haziran" , "Temmuz" , "Ağustos",
"Eylül" , "Ekim" ,"Kasım" , "Aralık"];

const API_KEY= "5f1291caf48d4e5cbc1142109230703";

setInterval (() => {
    const time =new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrFormat = hour >= 13 ? hour %12: hour;
    const minutes = time.getMinutes();
    const year = time.getFullYear();
    const ampm = hour >=12 ? 'PM' : 'AM'

    timeElement.innerHTML = hoursIn12HrFormat + ":" + minutes+ `<span id="am-pm">${ampm}</span>`;
    dateElement.innerHTML = days[day] + "," + " " +date +" "+ months[month] ;
    yearElement.innerHTML = year ;
   

})
