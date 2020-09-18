$("#search").on("click", function () {

    let api_key = "54e8632607a7b7305b56a20d56ee0b2e";
    let cityName = "Phoenix";

    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + api_key;

    let forecastWeatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + api_key;


    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).
        then(function (response) {
            console.log("Current Weather")
            console.log(response);

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

