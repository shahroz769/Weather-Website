window.getWeather = function () {
    let cityName = document.querySelector("#cityName").value;
    let API_KEY = '0d28b08855d3bdaa742b92c7ef323ee4'
    let weatherIcon = document.querySelector(".weather-icon");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            console.log(response.data);
            let weatherCondition = response.data.weather[0].main
            document.querySelector(".temp").innerHTML = Math.round(response.data.main.temp) + "°C"
            document.querySelector(".city").innerHTML = response.data.name
            document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}%`
            document.querySelector(".wind").innerHTML = `${response.data.wind.speed} km/hr`
            let x = response.data.coord.lat
            let y = response.data.coord.lon
            let dt = response.data.dt
            axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${x}, ${y}&timestamp=${dt}&key=AIzaSyBHaS_mpmdywnD2gwqk2MRjP0jM0LoHsbM`)
                .then(function (response) {
                    let timeZoneId = response.data.timeZoneId;
                    axios.get(`https://worldtimeapi.org/api/timezone/${timeZoneId}`)
                        .then(function (response) {
                            let card = document.querySelector(".card")
                            let time = (response.data.datetime);
                            let hour = +time.slice(11, 13)
                            console.log(response.data)
                            if (hour >= 20 || hour <= 4 && weatherCondition === "Clouds") {
                                weatherIcon.src = "./images/nightclouds.png"
                            } else if (hour >= 20 || hour <= 4 && weatherCondition === "Clear") {
                                weatherIcon.src = "./images/nightclear.png"
                            } else if (hour >= 20 || hour <= 4 && weatherCondition === "Drizzle") {
                                weatherIcon.src = "./images/nightdrizzle.png"
                            }
                            if (hour >= 5 && hour <= 15) {
                                card.classList.remove("night", "evening")
                                card.classList.add("day")
                                humidity.src = "./images/humiditydark.png"
                                wind.src = "./images/winddark.png"
                            } else if (hour >= 16 && hour <= 19) {
                                card.classList.remove("day", "night")
                                card.classList.add("evening")
                                humidity.src = "./images/humidity.png"
                                wind.src = "./images/wind.png"
                            } else if (hour >= 20 || hour <= 4) {
                                card.classList.remove("day", "evening",)
                                card.classList.add("night")
                                humidity.src = "./images/humidity.png"
                                wind.src = "./images/wind.png"
                            }
                        })
                        .catch(function (error) {
                            console.log(error.data);
                            let card = document.querySelector(".card")
                            card.classList.remove("day", "evening", "night")
                        })
                })
                .catch(function (error) {
                    console.log(error.data);
                })
            if (weatherCondition === "Clouds") {
                weatherIcon.src = "./images/clouds.png"
            }
            else if (weatherCondition === "Clear") {
                weatherIcon.src = "./images/clear.png"
            }
            else if (weatherCondition === "Rain") {
                weatherIcon.src = "./images/rain.png"
            }
            else if (weatherCondition === "Drizzle") {
                weatherIcon.src = "./images/drizzle.png"
            }
            else if (weatherCondition === "Mist") {
                weatherIcon.src = "./images/mist.png"
            }
            else if (weatherCondition === "Haze") {
                weatherIcon.src = "./images/haze.png"
            }
            else if (weatherCondition === "Snow") {
                weatherIcon.src = "./images/snow.png"
            }
            document.querySelector(".weather").style.display = "block"
            document.querySelector(".error").style.display = "none"
        })
        .catch(function (error) {
            let card = document.querySelector(".card")
            console.log(error.data);
            document.querySelector(".error").style.display = "block"
            document.querySelector(".weather").style.display = "none"
            card.classList.remove("day", "evening", "night")
        })
}