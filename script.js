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
            console.log("Current Weather:")
            console.log(response);

            // Today's Date
            let currentTime = moment().format("MMM Do YYYY");
            let today = $("<h1>");
            today.text(currentTime);
            $("#currentWeather").append(today);

            // Print the user entered City Name
            let cityName = $("<h2>");
            let icon = $("<img>");
            icon.attr("src", "http://openweathermap.org/img/wn/" + response.weather[0].icon + "@2x.png")
            cityName.text(response.name);
            $("#currentWeather").append(cityName);
            $("#currentWeather").append(icon);

            



            // Print the current temperature of the user entered City **ALSO** converts from Kelvin to F
            let temperature = $("<h5>");
            let kelvinTemp = response.main.temp;
            let fahrenheitTemp = parseInt((kelvinTemp - 273.15) * (9 / 5) + 32);
            temperature.text("Temperature: " + fahrenheitTemp + " F");
            $("#currentWeather").append(temperature);

            // Print the current humidy of the user entered City
            let humidity = $("<h5>");
            humidity.text("Humidity: " + response.main.humidity + " %");
            $("#currentWeather").append(humidity);

            // Print the current Wind Speed of the user entered City
            let windSpeed = $("<h5>");
            windSpeed.text("Wind Speed: " + response.wind.speed + " MPH");
            $("#currentWeather").append(windSpeed);

            // Pull the Lattitude and Longitude from current weather API
            let lat = response.coord.lat;
            let lon = response.coord.lon;
        
            let uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + api_key;

            $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).
                then(function (response) {
                    console.log("UV Index: ");
                    console.log(response);

                    let uvIndex = response.value;
                    console.log(uvIndex);

                    if (uvIndex >= 7) {
                        displayIndex = $("<h5>");
                        displayIndex.html("UV Index: " + '<span class="severe">' + uvIndex + '</span>');
                        $("#currentWeather").append(displayIndex);
                    } else if (uvIndex <= 6 && uvIndex >= 3) {
                        displayIndex = $("<h5>");
                        displayIndex.html("UV Index: " + '<span class="moderate">' + uvIndex + '</span>');
                        $("#currentWeather").append(displayIndex);
                    } else if (uvIndex <= 2) {
                        displayIndex = $("<h5>");
                        displayIndex.html("UV Index: " + '<span class="favorable">' + uvIndex + '</span>');
                        $("#currentWeather").append(displayIndex);
                    }

                });














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




