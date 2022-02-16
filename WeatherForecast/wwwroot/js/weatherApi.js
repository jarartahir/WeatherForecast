var cityName;
var apiKey = "d2eea58d7dc30d90a3b7140ec154646d";
var outputMode = "json";
var outputUnits = "metric";//metric to show data unit in celcius


//this function is used to get data from openweatherAPi
async function getWeather(city) {
    let responce = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&mode=${outputMode}&units=${outputUnits}`);
    //debugger;
    let data = responce.json();
    return data;
}

//this function will insert rows into table tag 
function insertRows(data, tBodyRef) {

    var iconUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
    tBodyRef.insertRow().innerHTML = `<b>Temperatur:</b> ${data.main.temp}&#8451`;
    tBodyRef.insertRow().innerHTML = `<b>Luftdruck:</b> ${data.main.pressure} hPa`;
    tBodyRef.insertRow().innerHTML = `<b>Feuchtigkeit:</b> ${data.main.humidity}%`;
    tBodyRef.insertRow().innerHTML = `<b>geringste Temperatur:</b> ${data.main.temp_min}&#8451`;
    tBodyRef.insertRow().innerHTML = `<b>hochste Temperatur:</b> ${data.main.temp_max}&#8451`;
    tBodyRef.insertRow().innerHTML = `<b>Windgeschwindigkeit:</b> ${data.wind.speed} m/s`;
    tBodyRef.insertRow().innerHTML = `<b>Windrichtung:</b> ${data.wind.deg} &#0176`;
    tBodyRef.insertRow().innerHTML = `<img src=${iconUrl}> ${data.weather[0].main}`;
}

//this function is used to get the city name when button is clicked and show the weather update of that city
function getCityName() {
    cityName = document.getElementById("cityNameInput").value;
    updateWeather(cityName);
}

//this function will call the api function and get the data and set the data content into HTML tags
function updateWeather(cityName) {
    getWeather(cityName).then(data => {
        //If user put invalid city name it will throw an alert
        if (data.cod == "404") {
            alert(data.message);
            setTimeout(() => document.getElementById("cityNameInput").focus(), 0)
            getCoordintes(); //If city not found then this function call will return the data of the user current location

        }

        document.getElementById("cityDescription").innerHTML = `Aktuelle Wetterlage in ${data.name}, ${data.sys.country}`;
        var tBodyRef = document.getElementById("weatherUpdates");
        deleteRows(tBodyRef);
        insertRows(data, tBodyRef);

    });
    console.log(cityName);
}
//this function is used to delete rows from table.
function deleteRows(tBodyRef) {
    while (tBodyRef.hasChildNodes()) {
        tBodyRef.removeChild(tBodyRef.firstChild);
    }
}

var input = document.getElementById("cityNameInput");
input.addEventListener("keydown", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        getCityName();
    }
});