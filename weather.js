const weather = document.querySelector(".js-weather");

const API_KEY = '6668116ee1110e223df9d5fa98a48542';
const COORDS = 'coords';

function getWeather(lat, lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json()
    }).then(function(json){
        //console.log(json);
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${place}, ${temperature}°C`;
    });
}

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, //latitude = latitude 와 같음
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,logitude);
}

function handleGeoError(){
    console.log("can't acess");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }
    else{
        const parsedCoords = JSON.parse(loadedCoords);
        //console.log(parsedCoords.latitude, parsedCoords.longitude)
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();