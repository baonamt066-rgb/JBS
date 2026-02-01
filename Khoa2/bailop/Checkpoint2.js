const API_KEY = "289b1cfba83a8b6aec6623cd52543989";

const cityInput = document.getElementById("cityInput");
const result = document.getElementById("result");
const btnCity = document.getElementById("btnCity");
const btnLocation = document.getElementById("btnLocation");

const searchScreen = document.querySelector(".screen-search");
const weatherScreen = document.querySelector(".screen-weather");

function showWeatherScreen() {
    searchScreen.classList.remove("active");
    searchScreen.classList.add("left");
    weatherScreen.classList.add("active");
}

function backToSearch() {
    weatherScreen.classList.remove("active");
    searchScreen.classList.remove("left");
    searchScreen.classList.add("active");
}

function displayWeather(data) {
    const icon = data.weather[0].icon;

    document.getElementById("weatherIcon").src =
        `https://openweathermap.org/img/wn/${icon}@4x.png`;

    document.getElementById("temperature").innerText =
        `${Math.round(data.main.temp)}°C`;

    document.getElementById("description").innerText =
        data.weather[0].description;

    document.getElementById("location").innerText =
        `📍 ${data.name}, ${data.sys.country}`;

    document.getElementById("Nhiệt độ").innerText =
        `${Math.round(data.main.feels_like)}°C`;

    document.getElementById("Độ ẩm").innerText =
        `${data.main.humidity}%`;

    showWeatherScreen();
}

btnCity.addEventListener("click", () => {
    const city = encodeURIComponent(cityInput.value.trim());
    if (!city) {
        alert("Vui lòng nhập tên thành phố!");
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=vi`)
        .then(res => res.json())
        .then(data => {
            if (data.cod != 200) {
                alert(data.message);
                return;
            }  
            displayWeather(data);
        })
        .catch(() => alert("Lỗi kết nối API"));
});

btnLocation.addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(pos => {
        const { latitude, longitude } = pos.coords;

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=vi`)
            .then(res => res.json())
            .then(data => displayWeather(data))
            .catch(() => alert("Không thể lấy dữ liệu thời tiết"));
    }, () => {
        alert("Bạn đã từ chối quyền định vị!");
    });
});
