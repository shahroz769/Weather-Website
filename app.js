window.getWeather = function () {
    let cityName = document.querySelector("#cityName").value;
    let API_KEY = '0d28b08855d3bdaa742b92c7ef323ee4'
    let weatherIcon = document.querySelector(".weather-icon");
    let humidity = document.querySelector("#humidity");
    let wind = document.querySelector("#wind");
    let weatherInfo = document.querySelector("h3");
    let sunrisePic = document.querySelector("#sunrise");
    let sunsetPic = document.querySelector("#sunset");
    let visible = document.querySelector("#visibility");
    let press = document.querySelector("#pressure");
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            console.log(response.data);
            let weatherCondition = response.data.weather[0].main
            let feelsLike = response.data.main.feels_like
            weatherInfo = weatherCondition + " | Feels like " + Math.round(feelsLike) + "°C"
            document.querySelector("h3").innerHTML = weatherInfo
            document.querySelector(".temp").innerHTML = Math.round(response.data.main.temp) + "°C"
            document.querySelector(".city").innerHTML = response.data.name
            document.querySelector(".country").innerHTML = `, ${response.data.sys.country}`
            document.querySelector(".humidity").innerHTML = `${response.data.main.humidity}%`
            document.querySelector(".wind").innerHTML = `${response.data.wind.speed} km/hr`
            document.querySelector(".max").innerHTML = `Max ${response.data.main.temp_max} °C`
            document.querySelector(".min").innerHTML = `Min ${response.data.main.temp_min} °C`
            document.querySelector(".visibility").innerHTML = ((+response.data.visibility) / 1000) + " KM"
            document.querySelector(".pressure").innerHTML = `${response.data.main.pressure} hPA`
            let x = response.data.coord.lat
            let y = response.data.coord.lon
            let dt = response.data.dt
            let sunRise = response.data.sys.sunrise
            let sunSet = response.data.sys.sunset
            axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${x}, ${y}&timestamp=${dt}&key=AIzaSyBHaS_mpmdywnD2gwqk2MRjP0jM0LoHsbM`)
                .then(function (response) {
                    let timeZoneId = response.data.timeZoneId;
                    if (timeZoneId == "Asia/Calcutta") {
                        timeZoneId = "Asia/kolkata"
                    }
                    axios.get(`https://worldtimeapi.org/api/timezone/${timeZoneId}`)
                        .then(function (response) {
                            let card = document.querySelector(".card")
                            let time = (response.data.datetime);
                            let hour = +time.slice(11, 13)
                            let minute = +time.slice(14, 16)
                            if (dt >= sunRise && hour < 17) {
                                card.classList.remove("night", "evening")
                                card.classList.add("day")
                                humidity.src = "./images/humidity-dark.png"
                                wind.src = "./images/wind-dark.png"
                                sunrisePic.src = "./images/sunrise-dark.png"
                                sunsetPic.src = "./images/sunset-dark.png"
                                visible.src = "./images/visibility-dark.png"
                                press.src = "./images/pressure-dark.png"
                            }
                            else if (hour >= 17 && dt < sunSet) {
                                card.classList.remove("day", "night")
                                card.classList.add("evening")
                                humidity.src = "./images/humidity-light.png"
                                wind.src = "./images/wind-light.png"
                                sunrisePic.src = "./images/sunrise-light.png"
                                sunsetPic.src = "./images/sunset-light.png"
                                visible.src = "./images/visibility-light.png"
                                press.src = "./images/pressure-light.png"
                            }
                            else if (dt > sunSet || dt < sunRise) {
                                card.classList.remove("day", "evening",)
                                card.classList.add("night")
                                humidity.src = "./images/humidity-light.png"
                                wind.src = "./images/wind-light.png"
                                sunrisePic.src = "./images/sunrise-light.png"
                                sunsetPic.src = "./images/sunset-light.png"
                                visible.src = "./images/visibility-light.png"
                                press.src = "./images/pressure-light.png"
                            }
                            let year = time.slice(0, 4)
                            let month = +time.slice(5, 7)
                            let day = +time.slice(8, 10)
                            let date = day + month + ", " + year
                            if (month === 1) {
                                month = "Jan"
                            }
                            else if (month === 2) {
                                month = "Feb"
                            }
                            else if (month === 3) {
                                month = "Mar"
                            }
                            else if (month === 4) {
                                month = "Apr"
                            }
                            else if (month === 5) {
                                month = "May"
                            }
                            else if (month === 6) {
                                month = "Jun"
                            }
                            else if (month === 7) {
                                month = "Jul"
                            }
                            else if (month === 8) {
                                month = "Aug"
                            }
                            else if (month === 9) {
                                month = "Sep"
                            }
                            else if (month === 10) {
                                month = "Oct"
                            }
                            else if (month === 11) {
                                month = "Nov"
                            }
                            else if (month === 12) {
                                month = "Dec"
                            }
                            if (day === 1 || day === 21 || day === 31) {
                                day = `${day}st`
                            } else if (day === 2 || day === 22) {
                                day = `${day}nd`
                            } else if (day === 3 || day === 23) {
                                day = `${day}rd`
                            } else if (day > 3) {
                                day = `${day}th`
                            }
                            let formatedDate = `${day} ${month}, ${year}`
                            let ampm = ""
                            if (hour <= 11) {
                                ampm = "AM"
                            } else {
                                ampm = "PM"
                            }
                            if (hour === 0) {
                                hour = 12;
                            } else if (hour > 12) {
                                hour = hour - 12
                            }
                            if (hour <= 9) {
                                hour = `0${hour}`
                            }
                            if (minute <= 9) {
                                minute = `0${minute}`
                            }
                            let formatedTime = `${hour}:${minute} ${ampm}`
                            document.querySelector(".date").innerHTML = formatedDate + " | " + formatedTime
                            console.log(response.data)
                        })
                        .catch(function (error) {
                            console.log(error.data);
                            let card = document.querySelector(".card")
                            card.classList.remove("day", "evening", "night")
                            humidity.src = "./images/humidity-light.png"
                            wind.src = "./images/wind-light.png"
                            document.querySelector(".error").style.display = "block"
                            document.querySelector(".weather").style.display = "none"
                            document.querySelector("#doodle").style.display = "block"
                        })
                })
                .catch(function (error) {
                    console.log(error.data);
                })
            if (weatherCondition === "Clouds") {
                if (dt > sunSet || dt < sunRise) {
                    weatherIcon.src = "./images/nightclouds.png"
                } else {
                    weatherIcon.src = "./images/clouds.png"
                }
            } else if (weatherCondition === "Clear") {
                if (dt > sunSet || dt < sunRise) {
                    weatherIcon.src = "./images/nightclear.png"
                } else {
                    weatherIcon.src = "./images/clear.png"
                }
            } else if (weatherCondition === "Rain") {
                weatherIcon.src = "./images/rain.png"
            } else if (weatherCondition === "Drizzle") {
                if (dt > sunSet || dt < sunRise) {
                    weatherIcon.src = "./images/nightdrizzle.png"
                } else {
                    weatherIcon.src = "./images/drizzle.png"
                }
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
            document.querySelector("#doodle").style.display = "none"
            gsap.fromTo(".weather", { opacity: 0 }, { opacity: 1, ease: "power4.out", duration: 2 })
            gsap.fromTo(".weather *", { y: '20px' }, { y: 0, ease: "power4.out", duration: 1 })
            gsap.fromTo(".weather-icon", { y: '-50px' }, { y: 0, ease: "power4.out", duration: 1 })
        })
        .catch(function (error) {
            let card = document.querySelector(".card")
            console.log(error.data);
            document.querySelector(".error").style.display = "block"
            document.querySelector(".weather").style.display = "none"
            document.querySelector("#doodle").style.display = "block"
            card.classList.remove("day", "evening", "night")
        })
}
window.getSun = function () {
    let cityName = document.querySelector("#cityName").value;
    let API_KEY = '0d28b08855d3bdaa742b92c7ef323ee4'
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`)
        .then(function (response) {
            console.log(response.data);
            let x = response.data.coord.lat
            let y = response.data.coord.lon
            let dt = response.data.dt
            let sunRise = response.data.sys.sunrise
            let sunSet = response.data.sys.sunset
            axios.get(`https://maps.googleapis.com/maps/api/timezone/json?location=${x}, ${y}&timestamp=${dt}&key=AIzaSyBHaS_mpmdywnD2gwqk2MRjP0jM0LoHsbM`)
                .then(function (response) {
                    let timeZoneId = response.data.timeZoneId;
                    if (timeZoneId == "Asia/Calcutta") {
                        timeZoneId = "Asia/kolkata"
                    }
                    axios.get(`https://worldtimeapi.org/api/timezone/${timeZoneId}`)
                        .then(function (response) {
                            let card = document.querySelector(".card")
                            let time = (response.data.datetime);
                            let hour = +time.slice(11, 13)
                            let minute = +time.slice(14, 16)
                            let minuteInHours = minute / 60
                            let totalHours = hour + minuteInHours
                            let dt_Sunrise = dt - sunRise
                            let dt_Sunset = dt - sunSet
                            let dt_SunriseInHours = (dt_Sunrise / (60 * 60))
                            let dt_SunsetInHours = (dt_Sunset / (60 * 60))
                            let sunRiseTotalHours
                            let sunSetTotalHours
                            if (dt_Sunrise < 0 && dt_Sunset < 0) {
                                sunRiseTotalHours = totalHours - dt_SunriseInHours
                                sunSetTotalHours = totalHours - dt_SunsetInHours - 12
                            }
                            else if (dt_Sunrise > 0 && dt_Sunset < 0) {
                                sunRiseTotalHours = totalHours - dt_SunriseInHours
                                sunSetTotalHours = totalHours - dt_SunsetInHours - 12
                            }
                            else if (dt_Sunrise > 0 && dt_Sunset > 0) {
                                sunRiseTotalHours = totalHours - dt_SunriseInHours
                                sunSetTotalHours = totalHours - dt_SunsetInHours - 12
                            }
                            let hr = (sunRiseTotalHours.toString().split(".")[0]); ///before
                            let hs = (sunSetTotalHours.toString().split(".")[0]); ///before
                            let sunRiseMinutes = (sunRiseTotalHours % 1)
                            let sunSetMinutes = (sunSetTotalHours % 1)
                            let sr = Math.round(sunRiseMinutes * 60)
                            let ss = Math.round(sunSetMinutes * 60)
                            if (sr < 10) {
                                sr = "0" + sr
                            }
                            if (ss < 10) {
                                ss = "0" + ss
                            }
                            let srt = `0${hr}:${sr} AM`
                            let sst = `0${hs}:${ss} PM`
                            document.querySelector(".sunrise").innerHTML = srt
                            document.querySelector(".sunset").innerHTML = sst
                        })
                })
                .catch(function (error) {
                    console.log(error.data);
                })
        })
        .catch(function (error) {
        })
}
gsap.to("#appImg", { 'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', opacity: 1, y: 0, ease: "power4.out", duration: 1.5 })
gsap.to(".card", { 'clip-path': 'polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)', opacity: 1, y: 0, ease: "power4.out", duration: 1.5 }, "-=1.3")
gsap.fromTo("#doodle", { y: '-200px', opacity: 0 }, { y: 0, opacity: 1, ease: "power4.out", duration: 1.5 }, "-=1")
gsap.fromTo(".search", { y: '-50px', opacity: 0 }, { y: 0, opacity: 1, ease: "power4.out", duration: 1.5 }, "-=1.3")