// When the 'Search Button' is clicked
$("#search").on("click", function () {

    // My API Key for the weather.api
    let api_key = "54e8632607a7b7305b56a20d56ee0b2e";
    
    // Get the user entered City from the HTML input field
    let cityEntry = ($("#cityEntry").val());

    // Reach out to the API(s) to get the Weather & Forecast
    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityEntry + "&appid=" + api_key;
    let forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityEntry + "&appid=" + api_key;


    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).
        then(function (response) {
                       
            let cityName = $("<h2>");
            cityName.text(response.name);
            $("#currentWeather").append(cityName);
            
            let temperature = $("<h5>");
            let kelvinTemp = response.main.temp;
            let fahrenheitTemp = parseInt((kelvinTemp - 273.15) * (9/5) + 32);
            temperature.text("Temperature: " + fahrenheitTemp + " F");
            $("#currentWeather").append(temperature);

            let humidity = $("<h5>");
            humidity.text("Humidity: " + response.main.humidity + " %");
            $("#currentWeather").append(humidity);

            let windSpeed = $("<h5>");
            windSpeed.text("Wind Speed: " + response.wind.speed + " MPH");
            $("#currentWeather").append(windSpeed);
            

            $.ajax({
                url: forecastWeatherURL,
                method: "GET"
            }).
                then(function (response) {
                    console.log("Forecast Weather: ");
                    console.log(response);

                });

        });

});

