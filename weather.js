const openApi={
    key: "7362b95352fbc464d92e523498aa3643",
    baseUrl:"http://api.openweathermap.org/data/2.5/"
}
const searchBox=document.querySelector('.search-box');
searchBox.addEventListener('keypress',getWeatherDetails);
function getWeatherDetails(evnt){
    if(evnt.keyCode==13){
    getWeatherInfo(searchBox.value);
    }
}
function getWeatherInfo(cityName){
    fetch(`${openApi.baseUrl}weather?q=${cityName}&units=metric&appid=${openApi.key}`)
    .then(weather=>{
        return weather.json();
    }).then(response=>{
        console.log(response);

        displayResponse(response);
    })
}

function displayResponse(weather){
    let city=document.querySelector('.location .city');
    city.innerText=`${weather.name}, ${weather.sys.country}`;
    let now=new Date();
    let date=document.querySelector('.location .date');
    date.innerText=dateBuilder(now);

    let temp=document.querySelector(`.current .temp`);

    temp.innerHTML=`${Math.round(weather.main.temp)} <span>&deg;C</span>`;

    let weather_el=document.querySelector(`.current .weather`);
    weather_el.innerText=weather.weather[0].main;
    let high_low=document.querySelector(`.current .hi-low`);
    high_low.innerHTML=`${Math.round(weather.main.temp_min)}<span>&deg;</span>C/${Math.round(weather.main.temp_max)}<span>&deg;</span>C`;
}
function dateBuilder(currentDate){
    let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day=days[currentDate.getDay()];
    let date=currentDate.getDate();
    let month=months[currentDate.getMonth()];
    let year=currentDate.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}