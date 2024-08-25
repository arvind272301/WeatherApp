const apiKey = '3980d1bdeb7841cf9e3120631242108'; // Replace with your API key

document.getElementById('get-weather-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

function getWeather(city) {
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.location) {
                updateWeather(data);
                getForecast(city);
            } else {
                alert('City not found.');
            }
        })
        .catch(error => console.error('Error fetching the weather data:', error));
}

function updateWeather(data) {
    document.getElementById('temp-value').textContent = `${data.current.temp_c}°C`;
    document.getElementById('temp-description').textContent = data.current.condition.text;
    document.getElementById('city').textContent = data.location.name;
    document.getElementById('country').textContent = data.location.country;
}

function getForecast(city) {
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`; // Adjust days as needed

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            updateForecast(data.forecast.forecastday);
        })
        .catch(error => console.error('Error fetching the forecast data:', error));
}

function updateForecast(forecastData) {
    const forecastContainer = document.getElementById('forecast-cards');
    forecastContainer.innerHTML = ''; // Clear any existing forecast cards

    forecastData.forEach((forecast) => {
        const day = new Date(forecast.date).toLocaleString('en-US', { weekday: 'short' });
        const card = document.createElement('div');
        card.className = 'forecast-card';
        card.innerHTML = `
            <span class="day">${day}</span>
            <span class="temp">${forecast.day.avgtemp_c}°C</span>
            <span class="description">${forecast.day.condition.text}</span>
        `;
        forecastContainer.appendChild(card);
    });
}
