const apiKey = "8d5cde49b2f509fbdb893dab4accd2b6";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";
const searchInput = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}?q=${city}&appid=${apiKey}`);
        if (!response.ok) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    throw new Error(`HTTP error! status: ${response.status}`);
}

        const data = await response.json();

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°F";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + "km/h";

        const weatherCondition = data.weather[0].main.toLowerCase();
        if (weatherCondition === "rain") {
            weatherIcon.src = "images/rain.png";
        } else if (weatherCondition === "clear") {
            weatherIcon.src = "images/clear.png";
        } else if (weatherCondition === "clouds") {
            weatherIcon.src = "images/clouds.png";
        } else if (weatherCondition === "mist") {
            weatherIcon.src = "images/mist.png";
        } else if (weatherCondition === "snow") {
            weatherIcon.src = "images/snow.png";
        } else if (weatherCondition === "drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
        console.error(error.message);
    }
}

searchButton.addEventListener("click", () => {
    if (searchInput.value.trim() === "") {
        alert("Please enter a city name!");
    } else {
        checkWeather(searchInput.value.trim());
    }
});
