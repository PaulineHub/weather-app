window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDesc = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            apiKey = `3697cc65ac43a4c5773c72bfb358730c`;

            const api = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`;
            
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    const temperature = data.current.temp;
                    const description = data.current.weather.map(item => {
                        return item.main
                    }).toString();
                    //console.log(data)
                    //set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDesc.textContent = description;
                    locationTimezone.textContent = data.timezone;
                    //set Icon
                    const icon = data.current.weather.map(item => {
                        return item.icon;
                    }).toString();
                    const iconCanvas = document.getElementById("icon");
                    setIcons(iconCanvas, icon);
                    //set temperature
                    temperatureDegree.textContent = Math.floor(temperature);
                })
        });
    }

    function setIcons(iconID, icon){
        let skyIcon = '';
        skycons = new Skycons();
        if(icon === "01d") {skyIcon = "CLEAR_DAY";}
        if(icon === "01n") {skyIcon = "CLEAR_NIGHT";}
        if(icon === "02d") {skyIcon = "PARTLY_CLOUDY_DAY";}
        if(icon === "02n") {skyIcon = "PARTLY_CLOUDY_NIGHT";}
        if(icon === "04d" || icon === "03d" || icon === "04n" || icon === "03n") {skyIcon = "CLOUDY";}
        if(icon === "09d" || icon === "10d" || icon === "09n" || icon === "10n") {skyIcon = "RAIN";}
        if(icon === "11d" || icon === "11n") {skyIcon = "RAIN";}
        if(icon === "13d" || icon === "13n") {skyIcon = "SNOW";}
        if(icon === "50d" || icon === "50n") {skyIcon = "FOG";}

        skycons.play();
        return skycons.set(iconID, Skycons[skyIcon]);
    }
});