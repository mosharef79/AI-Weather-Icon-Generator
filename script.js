const apiKey = 'f28ba83e93eba0968590fc739a7697a4'; 
const cityInput = document.getElementById('cityInput');
const getWeatherBtn = document.getElementById('getWeatherBtn');
const weatherIcon = document.getElementById('weatherIcon');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const humidity = document.getElementById('humidity');
const description = document.getElementById('description');

getWeatherBtn.addEventListener('click', getWeather);

function getWeather() {
  const city = cityInput.value;

  if (!city) {
    alert('Please enter a city name');
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      const weather = data.weather[0];
      const main = data.main;

      cityName.textContent = data.name;
      temperature.textContent = `${main.temp}°C`;
      humidity.textContent = `Humidity: ${main.humidity}%`;
      description.textContent = `Condition: ${weather.description}`;

      const imageUrl = getWeatherImagePath(weather.main);
      const miniIconsHTML = getMiniIcons(weather.main);

      weatherIcon.innerHTML = `
        <div class="icon-wrapper">
          ${miniIconsHTML}
          <img src="${imageUrl}" alt="${weather.main} icon" class="main-img">
        </div>
      `;
    })
    .catch(err => {
      console.log('Error:', err);
      alert('Could not fetch weather data. Please try again.');
    });
}

function getWeatherImagePath(condition) {
  switch (condition.toLowerCase()) {
    case 'clear':
      return 'sun.jpg';
    case 'clouds':
      return 'cloud.webp';
    case 'rain':
      return 'rain.jpg';
    
    default:
      return 'default.jpg';
  }
}

function getMiniIcons(condition) {
  let emoji = '🌈';
  switch (condition.toLowerCase()) {
    case 'clear':
      emoji = '☀️';
      break;
    case 'clouds':
      emoji = '☁️';
      break;
    case 'rain':
      emoji = '💧';
      break;
   
  }

  // Generate 3 animated icons
  return `
    <div class="floating-icon icon1">${emoji}</div>
    <div class="floating-icon icon2">${emoji}</div>
    <div class="floating-icon icon3">${emoji}</div>
  `;
}



