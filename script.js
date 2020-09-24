// When the 'Search Button' is clicked
$(".btn").on("click", function () {

    // My API Key for the weather.api
    let api_key = "54e8632607a7b7305b56a20d56ee0b2e";

    // Get the user entered City from the HTML input field
    let cityEntry = ($("#cityEntry").val());

    // Empty array into which the user selected cities are 'pushed into'
    let cityHistory = [];
    cityHistory.push(cityEntry);

    // Loop through the array and create a button for each city name
    for (let i = 0; i < cityHistory.length; i++) {
        let cityButton = $("<button>");
        cityButton.html('<button class="btn btn-primary" type="button">' + cityHistory[i] + '</button');
        $("#searchHistory").append(cityButton);
    };


    // Reach out to the API(s) to get the Weather & Forecast
    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityEntry + "&appid=" + api_key;
    let forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityEntry + "&appid=" + api_key;


    // Call to reach out to the API and get current weather info
    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).
        then(function (response) {
            $("#currentWeather").empty();
            $("#currentWeather").append("<h1>Weather Today:</h1>");

            // Today's Date printed to HTML
            let currentTime = moment().format("MMM Do YYYY");
            let today = $("<h1>");
            today.text(currentTime);
            $("#currentWeather").append(today);

            // Print the user entered City Name from input field & Icon from API data for the weather
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


            // Pull the Lattitude and Longitude for the user entered city from current weather API
            let lat = response.coord.lat;
            let lon = response.coord.lon;

            // Take Lattitude and Longitude to the uvIndex API to get infromation
            let uvIndexURL = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + api_key;

            // Call to the uvIndex API
            $.ajax({
                url: uvIndexURL,
                method: "GET"
            }).
                then(function (response) {
                    
                    // Pull the uvIndex value from the API data
                    let uvIndex = response.value;
                    
                    // Evaluates the value of the uvIndex and color codes it accordingly from the style.css file
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

            // Call to the forecast API to get 5-day forecast weather
            $.ajax({
                url: forecastWeatherURL,
                method: "GET"
            }).
                then(function (response) {
                    // Empties the 'html container' to ensure things don't "stack up"
                    $("#fiveDay").empty();
                    $("#fiveDay").append("<h1>5-Day Forecast:</h1>");

                    for (let i = 0; i < 5; i++) {
                        // Creates a new Div to store the 5-day forecast
                        let newDiv = $("<div>");
                        newDiv.addClass("row");
                       
                        // Future date
                        let futureDate = $("<h1>");
                        futureDate = moment().add((i + 1), 'day').format('MM/DD/YYYY');
                        newDiv.append(futureDate);

                        // Weather icon for the future date
                        let newIcon = $("<img>");
                        newIcon.attr("src", "http://openweathermap.org/img/wn/" + response.list[i].weather[0].icon + "@2x.png");
                        newDiv.append(newIcon);

                        // Future date temp converted to F
                        let kelvinTemp = response.list[i].main.temp;
                        let fahrenheitTemp = parseInt(
                            (kelvinTemp - 273.15) * (9 / 5) + 32);

                        // Displays the future temp
                        let displayTemp = $("<p>");
                        displayTemp.text("Temp: " + fahrenheitTemp + " F ");
                        newDiv.append(displayTemp);

                        // Displays the future humidity
                        let displayHumidity = $("<p>");
                        displayHumidity.text("Humidity: " + response.list[0].main.humidity + " %");
                        newDiv.append(displayHumidity);

                        // Attaches the newly created div to the HTML
                        $("#fiveDay").append(newDiv);

                    };

                });

        });

});



