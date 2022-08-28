// DOM variables
const moreInfo = document.getElementById('more-info');
const moreInfoElements = document.querySelectorAll('#more-info-elements');
const container = document.getElementById('container');
const temperature = document.getElementById('gradus');
const trick = document.getElementById('trick');
const trick2 = document.getElementById('trick-2')
const posibleWeather = document.getElementById('posible-weather');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const input = document.getElementById('input');
const submit = document.getElementById('button-input');
const yourCity = document.getElementById('your-city');
const weatherInfo = document.getElementById('info');

// SPREAD ARRAY
let moreInfoElementsArr = [...moreInfoElements];
let windDegrees = moreInfoElementsArr[0];
let pressure = moreInfoElementsArr[1];
let cloudQuantity = moreInfoElementsArr[2];

// More info onclick
moreInfo.addEventListener('click', () => {
    moreInfo.style.display = 'none';
    (moreInfoElements.forEach(el => {
        el.style.display = 'inline';
    }));
    container.style.height = '469px'
})

// City Submit click

submit.addEventListener('click', () => {
    yourCity.textContent = `Your city: ${input.value}`;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=d2ab1c493a4e139b90b4297f73438586&units=metric`;
    let req = new Request(url);
    sendRequest(req); 
    weatherInfo.style.visibility = 'visible';
})

// All fetch DOM
const AllDOM = (obj) => {
    if(obj.cod == 404) {
        yourCity.textContent = 'City not found!';
        yourCity.classList.add('text-red-600');
        temperature.textContent = 'City is not choosen';
        posibleWeather.textContent = 'City is not choosen';
        humidity.textContent = 'City is not choosen';
        windSpeed.textContent = 'City is not choosen';
        windDegrees.textContent = 'City is not choosen';
        pressure.textContent = 'City is not choosen';
        cloudQuantity.textContent = 'City is not choosen';
        weatherInfo.style.visibility = 'hidden'
    }

    temperature.textContent = Math.round(obj.main.temp) + trick.textContent;
    posibleWeather.textContent = obj.weather[0].main;
    humidity.textContent = `Humidity: ${obj.main.humidity}%`;
    windSpeed.textContent = `Wind speed: ${obj.wind.speed}km/h`;
    windDegrees.textContent = `Wind degrees: ${obj.wind.deg}${trick2.textContent}`;
    pressure.textContent = `Pressure: ${obj.main.pressure}N/m2`;
    cloudQuantity.textContent = `Clouds quantity: ${obj.clouds.all} cloud`;
    weatherInfo.src = `http://openweathermap.org/img/wn/${obj.weather[0].icon}@2x.png`;
}
// Fetch
function sendRequest(req){
    fetch(req)
    .then(respone => respone.json())
    .then(result => {
        AllDOM(result);
        console.log(result);
    })
}

sendRequest();

