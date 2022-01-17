// Step 1: Get user coordinates
function getCoordintes() {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;
        var lat = crd.latitude.toString();
        var lng = crd.longitude.toString();
        var coordinates = [lat, lng];
        console.log(`Latitude: ${lat}, Longitude: ${lng}`);
        getLocation(coordinates).then(data => {
            console.log(data.address.city_district)
            document.getElementById("cityNameInput").value = data.address.city_district;

            updateWeather(data.address.city_district);
            
        });
        return;

    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

// Step 2: Get city name
async function getLocation(coordinates) {
    var lat = coordinates[0];
    var lng = coordinates[1];

    let responce = await fetch(`https://us1.locationiq.com/v1/reverse.php?key=pk.469dc9225fb58b3270580330c7821ca9&lat=${lat}&lon=${lng}&format=json`);
    
    let data = responce.json();
    return data;
}

getCoordintes();



