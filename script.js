// DOM Elements
const citySearch = document.getElementById('city-search');
const searchBtn = document.getElementById('search-btn');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');

// Current Weather Elements
const currentCity = document.getElementById('current-city');
const currentDate = document.getElementById('current-date');
const currentTemp = document.getElementById('current-temp');
const currentDesc = document.getElementById('current-desc');
const currentWeatherIcon = document.getElementById('current-weather-icon');
const humidityValue = document.getElementById('humidity-value');
const windValue = document.getElementById('wind-value');
const lastUpdated = document.getElementById('last-updated');

// More Weather Info Elements
const pressureValue = document.getElementById('pressure-value');
const visibilityValue = document.getElementById('visibility-value');
const uvValue = document.getElementById('uv-value');
const feelsLikeValue = document.getElementById('feels-like-value');

// Forecast Container
const forecastContainer = document.getElementById('forecast-container');

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeSun = document.getElementById('theme-sun');
const themeMoon = document.getElementById('theme-moon');

// New Elements
const unitToggle = document.getElementById('unit-toggle');
const refreshBtn = document.getElementById('refresh-btn');
const favoriteBtn = document.getElementById('favorite-btn');
const addFavoriteBtn = document.getElementById('add-favorite-btn');
const suggestionsDropdown = document.getElementById('suggestions-dropdown');
const favoriteModal = document.getElementById('favorite-modal');
const favoriteList = document.getElementById('favorite-list');
const closeFavorite = document.getElementById('close-favorite');
const clearFavorites = document.getElementById('clear-favorites');

// Global Variables
let currentCityName = 'Jakarta';
let currentUnit = 'metric'; // 'metric' untuk °C, 'imperial' untuk °F
let favorites = JSON.parse(localStorage.getItem('weatherFavorites')) || [];
let currentWeatherData = null;

// ===========================
// WEATHER BACKGROUND SYSTEM
// ===========================

// Weather Background System
function updateWeatherBackground(weatherData) {
    const background = document.getElementById('weather-background');
    const weatherMain = weatherData.weather[0].main.toLowerCase();
    const weatherIcon = weatherData.weather[0].icon;
    const isNight = weatherIcon.includes('n');
    
    // Clear existing classes and particles
    background.className = 'weather-bg';
    document.querySelectorAll('.weather-particle').forEach(el => el.remove());
    
    // Set background based on weather condition
    let bgClass = '';
    let particles = [];
    
    if (isNight) {
        bgClass = 'bg-night';
        particles = createStars();
    } else {
        switch(weatherMain) {
            case 'clear':
                bgClass = 'bg-sunny';
                particles = createSunRays();
                break;
            case 'clouds':
                bgClass = 'bg-cloudy';
                particles = createClouds();
                break;
            case 'rain':
            case 'drizzle':
                bgClass = 'bg-rainy';
                particles = createRain();
                break;
            case 'snow':
                bgClass = 'bg-snow';
                particles = createSnow();
                break;
            case 'thunderstorm':
                bgClass = 'bg-rainy';
                particles = createRain();
                // Add lightning effect
                setTimeout(createLightning, Math.random() * 10000);
                break;
            case 'mist':
            case 'fog':
            case 'haze':
                bgClass = 'bg-cloudy';
                particles = createFog();
                break;
            default:
                bgClass = 'bg-sunny';
        }
    }
    
    background.classList.add(bgClass);
    particles.forEach(particle => background.appendChild(particle));
}

// Particle Creation Functions
function createRain() {
    const drops = [];
    for (let i = 0; i < 50; i++) {
        const drop = document.createElement('div');
        drop.className = 'weather-particle rain-drop';
        drop.style.left = Math.random() * 100 + 'vw';
        drop.style.animationDelay = Math.random() * 2 + 's';
        drop.style.animationDuration = (0.5 + Math.random() * 0.5) + 's';
        drops.push(drop);
    }
    return drops;
}

function createSnow() {
    const flakes = [];
    for (let i = 0; i < 30; i++) {
        const flake = document.createElement('div');
        flake.className = 'weather-particle snow-flake';
        flake.style.left = Math.random() * 100 + 'vw';
        flake.style.width = (2 + Math.random() * 4) + 'px';
        flake.style.height = flake.style.width;
        flake.style.animationDelay = Math.random() * 5 + 's';
        flake.style.animationDuration = (3 + Math.random() * 7) + 's';
        flakes.push(flake);
    }
    return flakes;
}

function createStars() {
    const stars = [];
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.className = 'weather-particle';
        star.style.background = 'white';
        star.style.borderRadius = '50%';
        star.style.width = (Math.random() * 2) + 'px';
        star.style.height = star.style.width;
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        star.style.animation = `twinkle ${3 + Math.random() * 7}s infinite alternate`;
        stars.push(star);
    }
    return stars;
}

function createSunRays() {
    const rays = [];
    const ray = document.createElement('div');
    ray.className = 'weather-particle sun-ray';
    ray.style.width = '200px';
    ray.style.height = '200px';
    ray.style.top = '50px';
    ray.style.right = '50px';
    rays.push(ray);
    return rays;
}

function createClouds() {
    const clouds = [];
    for (let i = 0; i < 5; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'weather-particle cloud';
        cloud.style.width = (100 + Math.random() * 100) + 'px';
        cloud.style.height = (40 + Math.random() * 30) + 'px';
        cloud.style.top = (Math.random() * 50) + 'vh';
        cloud.style.animationDelay = Math.random() * 20 + 's';
        cloud.style.animationDuration = (30 + Math.random() * 30) + 's';
        clouds.push(cloud);
    }
    return clouds;
}

function createFog() {
    const fogParticles = [];
    for (let i = 0; i < 10; i++) {
        const fog = document.createElement('div');
        fog.className = 'weather-particle cloud';
        fog.style.background = 'rgba(255,255,255,0.4)';
        fog.style.width = (150 + Math.random() * 100) + 'px';
        fog.style.height = (60 + Math.random() * 40) + 'px';
        fog.style.top = (Math.random() * 80) + 'vh';
        fog.style.animationDelay = Math.random() * 15 + 's';
        fog.style.animationDuration = (40 + Math.random() * 40) + 's';
        fogParticles.push(fog);
    }
    return fogParticles;
}

function createLightning() {
    const lightning = document.createElement('div');
    lightning.className = 'weather-particle';
    lightning.style.position = 'fixed';
    lightning.style.top = '0';
    lightning.style.left = '0';
    lightning.style.width = '100%';
    lightning.style.height = '100%';
    lightning.style.background = 'rgba(255,255,255,0.3)';
    lightning.style.zIndex = '1';
    lightning.style.animation = 'lightningFlash 0.5s';
    
    document.getElementById('weather-background').appendChild(lightning);
    setTimeout(() => lightning.remove(), 500);
}

// Add to keyframes in CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 1; }
    }
    @keyframes lightningFlash {
        0%, 100% { opacity: 0; }
        50% { opacity: 0.3; }
    }
`;
document.head.appendChild(style);

// ===========================
// REAL-TIME CLOCK & INITIALIZE APP
// ===========================

// Real-time clock function
function startRealTimeClock() {
    updateRealTimeClock(); // Initial update
    setInterval(updateRealTimeClock, 1000); // Update every second
}

function updateRealTimeClock() {
    const now = new Date();
    
    // Update current date dengan format lengkap
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    
    currentDate.textContent = now.toLocaleDateString('id-ID', options);
}

// Update juga updateLastUpdated() untuk format yang lebih baik
function updateLastUpdated() {
    const now = new Date();
    lastUpdated.textContent = `Data diperbarui: ${now.toLocaleTimeString('id-ID')} | ${now.toLocaleDateString('id-ID')}`;
}

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    initializeTheme();
    initializeUnits();
    loadWeatherData(currentCityName);
    setupEventListeners();
    startAutoRefresh();
    startRealTimeClock();
    updateFavoriteButton();
}

function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);
}

function applyTheme(theme) {
    const htmlEl = document.documentElement;
    if (theme === 'dark') {
        htmlEl.classList.add('dark');
        themeSun.classList.remove('hidden');
        themeMoon.classList.add('hidden');
    } else {
        htmlEl.classList.remove('dark');
        themeSun.classList.add('hidden');
        themeMoon.classList.remove('hidden');
    }
    localStorage.setItem('theme', theme);
}

function initializeUnits() {
    const savedUnit = localStorage.getItem('weatherUnit') || 'metric';
    currentUnit = savedUnit;
    updateUnitToggle();
}

function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', handleSearch);
    citySearch.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleSearch();
        }
    });

    // Theme toggle
    themeToggle.addEventListener('click', function() {
        const newTheme = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // New event listeners
    unitToggle.addEventListener('click', toggleTemperatureUnit);
    refreshBtn.addEventListener('click', handleManualRefresh);
    favoriteBtn.addEventListener('click', showFavoriteModal);
    addFavoriteBtn.addEventListener('click', addCurrentToFavorites);
    closeFavorite.addEventListener('click', closeFavoriteModal);
    clearFavorites.addEventListener('click', clearAllFavorites);
    
    // Search with debouncing for suggestions
    citySearch.addEventListener('input', debounce(handleSearchInput, 300));
    
    // Close suggestions when clicking outside
    document.addEventListener('click', (e) => {
        if (!citySearch.contains(e.target) && !suggestionsDropdown.contains(e.target)) {
            suggestionsDropdown.classList.add('hidden');
        }
    });
    
    // Close modal when clicking outside
    favoriteModal.addEventListener('click', (e) => {
        if (e.target === favoriteModal) {
            closeFavoriteModal();
        }
    });
}

// Debounce function untuk search suggestions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Auto-complete suggestions
async function handleSearchInput() {
    const query = citySearch.value.trim();
    
    if (query.length < 2) {
        suggestionsDropdown.classList.add('hidden');
        return;
    }
    
    try {
        const response = await fetch(
            `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${CONFIG.API_KEY}`
        );
        const cities = await response.json();
        
        showSuggestions(cities);
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        suggestionsDropdown.classList.add('hidden');
    }
}

function showSuggestions(cities) {
    if (cities.length === 0) {
        suggestionsDropdown.classList.add('hidden');
        return;
    }
    
    suggestionsDropdown.innerHTML = '';
    cities.forEach(city => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-200 dark:border-slate-600 last:border-b-0';
        suggestionItem.textContent = `${city.name}, ${city.country}`;
        suggestionItem.addEventListener('click', () => {
            citySearch.value = `${city.name}, ${city.country}`;
            suggestionsDropdown.classList.add('hidden');
            handleSearch();
        });
        suggestionsDropdown.appendChild(suggestionItem);
    });
    
    // Position dropdown below search input
    const searchInput = document.getElementById('city-search');
    const rect = searchInput.getBoundingClientRect();
    suggestionsDropdown.style.top = `${rect.bottom + window.scrollY}px`;
    suggestionsDropdown.style.left = `${rect.left + window.scrollX}px`;
    suggestionsDropdown.style.width = `${rect.width}px`;
    
    suggestionsDropdown.classList.remove('hidden');
}

function handleSearch() {
    const city = citySearch.value.trim();
    if (city) {
        currentCityName = city;
        loadWeatherData(city);
        citySearch.value = '';
        suggestionsDropdown.classList.add('hidden');
    }
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    setTimeout(() => {
        errorMessage.classList.add('hidden');
    }, 5000);
}

function hideError() {
    errorMessage.classList.add('hidden');
}

async function loadWeatherData(city) {
    try {
        setSkeletonLoading(true);
        hideError();
        
        // Fetch current weather and forecast
        const [currentData, forecastData] = await Promise.all([
            fetchCurrentWeather(city),
            fetch5DayForecast(city)
        ]);

        currentWeatherData = {
            currentData,
            forecastData
        };

        updateCurrentWeather(currentData);
        updateForecast(forecastData);
        updateLastUpdated();
        updateFavoriteButton();
        updateWeatherBackground(currentData); // <- BARIS YANG DITAMBAHKAN
        
    } catch (error) {
        console.error('Error loading weather data:', error);
        showError('Kota tidak ditemukan. Coba cari kota lain.');
    } finally {
        setSkeletonLoading(false);
    }
}

async function fetchCurrentWeather(city) {
    const response = await fetch(
        `${CONFIG.BASE_URL}/weather?q=${city}&appid=${CONFIG.API_KEY}&units=${currentUnit}&lang=id`
    );
    
    if (!response.ok) {
        throw new Error('City not found');
    }
    
    return await response.json();
}

async function fetch5DayForecast(city) {
    const response = await fetch(
        `${CONFIG.BASE_URL}/forecast?q=${city}&appid=${CONFIG.API_KEY}&units=${currentUnit}&lang=id`
    );
    
    if (!response.ok) {
        throw new Error('Forecast data not available');
    }
    
    return await response.json();
}

function updateCurrentWeather(data) {
    const temp = currentUnit === 'metric' ? 
        Math.round(data.main.temp) : 
        Math.round((data.main.temp * 9/5) + 32);
    
    const windSpeed = currentUnit === 'metric' ?
        Math.round(data.wind.speed * 3.6) + ' km/h' :
        Math.round(data.wind.speed * 2.237) + ' mph';

    const feelsLike = currentUnit === 'metric' ?
        Math.round(data.main.feels_like) :
        Math.round((data.main.feels_like * 9/5) + 32);

    const visibility = data.visibility / 1000; // Convert to km

    currentCity.textContent = data.name + ', ' + data.sys.country;
    currentTemp.textContent = temp + (currentUnit === 'metric' ? '°C' : '°F');
    currentDesc.textContent = data.weather[0].description;
    currentWeatherIcon.innerHTML = getWeatherIcon(data.weather[0].icon); // GANTI INI
    humidityValue.textContent = data.main.humidity + '%';
    windValue.textContent = windSpeed;
    
    // Update new weather info
    pressureValue.textContent = data.main.pressure + ' hPa';
    visibilityValue.textContent = visibility.toFixed(1) + ' km';
    feelsLikeValue.textContent = feelsLike + (currentUnit === 'metric' ? '°C' : '°F');
    uvValue.textContent = 'N/A'; // UV data requires separate API call
}

function updateForecast(data) {
    // Group forecast by day and take one reading per day
    const dailyForecasts = [];
    const processedDays = new Set();
    
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000);
        const day = date.toLocaleDateString('id-ID', { weekday: 'long' });
        
        if (!processedDays.has(day) && dailyForecasts.length < 5) {
            const temp = currentUnit === 'metric' ?
                Math.round(item.main.temp) :
                Math.round((item.main.temp * 9/5) + 32);
            
            const windSpeed = currentUnit === 'metric' ?
                Math.round(item.wind.speed * 3.6) :
                Math.round(item.wind.speed * 2.237);

            dailyForecasts.push({
                day: day,
                temp: temp,
                description: item.weather[0].description,
                icon: item.weather[0].icon,
                humidity: item.main.humidity,
                wind: windSpeed,
                unit: currentUnit === 'metric' ? 'km/h' : 'mph'
            });
            processedDays.add(day);
        }
    });

    // Update forecast UI dengan Font Awesome
    forecastContainer.innerHTML = '';
    dailyForecasts.forEach(forecast => {
        const forecastCard = document.createElement('div');
        forecastCard.className = 'forecast-card card p-4 rounded-lg shadow text-center fade-in';
        forecastCard.innerHTML = `
            <div class="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-2">${forecast.day}</div>
            <div class="text-3xl mb-2 weather-icon">${getWeatherIcon(forecast.icon)}</div>
            <div class="text-2xl font-bold text-slate-800 dark:text-white mb-1">${forecast.temp}${currentUnit === 'metric' ? '°C' : '°F'}</div>
            <div class="text-sm text-slate-600 dark:text-slate-400 mb-2">${forecast.description}</div>
            <div class="flex justify-between text-xs text-slate-500 dark:text-slate-500">
                <span><i class="fas fa-tint mr-1"></i>${forecast.humidity}%</span>
                <span><i class="fas fa-wind mr-1"></i>${forecast.wind} ${forecast.unit}</span>
            </div>
        `;
        forecastContainer.appendChild(forecastCard);
    });
}

function getWeatherIcon(iconCode) {
    const iconMap = {
        '01d': '<i class="fas fa-sun text-yellow-500"></i>',
        '01n': '<i class="fas fa-moon text-blue-300"></i>',
        '02d': '<i class="fas fa-cloud-sun text-gray-400"></i>',
        '02n': '<i class="fas fa-cloud-moon text-gray-400"></i>',
        '03d': '<i class="fas fa-cloud text-gray-400"></i>',
        '03n': '<i class="fas fa-cloud text-gray-400"></i>',
        '04d': '<i class="fas fa-cloud text-gray-500"></i>',
        '04n': '<i class="fas fa-cloud text-gray-500"></i>',
        '09d': '<i class="fas fa-cloud-rain text-blue-400"></i>',
        '09n': '<i class="fas fa-cloud-rain text-blue-400"></i>',
        '10d': '<i class="fas fa-cloud-sun-rain text-blue-400"></i>',
        '10n': '<i class="fas fa-cloud-moon-rain text-blue-400"></i>',
        '11d': '<i class="fas fa-bolt text-yellow-400"></i>',
        '11n': '<i class="fas fa-bolt text-yellow-400"></i>',
        '13d': '<i class="fas fa-snowflake text-blue-200"></i>',
        '13n': '<i class="fas fa-snowflake text-blue-200"></i>',
        '50d': '<i class="fas fa-smog text-gray-300"></i>',
        '50n': '<i class="fas fa-smog text-gray-300"></i>'
    };
    return iconMap[iconCode] || '<i class="fas fa-cloud text-gray-400"></i>';
}

// Keep the existing getWeatherEmoji function for compatibility
function getWeatherEmoji(iconCode) {
    const emojiMap = {
        '01d': '☀️', '01n': '🌙',
        '02d': '⛅', '02n': '☁️',
        '03d': '☁️', '03n': '☁️',
        '04d': '☁️', '04n': '☁️',
        '09d': '🌧️', '09n': '🌧️',
        '10d': '🌦️', '10n': '🌦️',
        '11d': '⛈️', '11n': '⛈️',
        '13d': '❄️', '13n': '❄️',
        '50d': '🌫️', '50n': '🌫️'
    };
    return emojiMap[iconCode] || '⛅';
}

function setSkeletonLoading(isLoading) {
    const containers = document.querySelectorAll('.skeleton-container');
    if (isLoading) {
        containers.forEach(c => {
            c.querySelector('.data-content').style.display = 'none';
            c.querySelector('.skeleton').style.display = 'block';
        });
    } else {
        containers.forEach(c => {
            c.querySelector('.data-content').style.display = 'block';
            c.querySelector('.skeleton').style.display = 'none';
        });
    }
}

function startAutoRefresh() {
    // Auto refresh every 5 minutes (300000 ms)
    setInterval(() => {
        if (currentCityName) {
            loadWeatherData(currentCityName);
        }
    }, 300000);
}

// Temperature unit toggle
function toggleTemperatureUnit() {
    currentUnit = currentUnit === 'metric' ? 'imperial' : 'metric';
    localStorage.setItem('weatherUnit', currentUnit);
    updateUnitToggle();
    
    if (currentWeatherData) {
        updateCurrentWeather(currentWeatherData.currentData);
        updateForecast(currentWeatherData.forecastData);
    }
}

function updateUnitToggle() {
    unitToggle.textContent = currentUnit === 'metric' ? '°C / °F' : '°F / °C';
}

// Manual refresh
function handleManualRefresh() {
    const refreshBtn = document.getElementById('refresh-btn');
    refreshBtn.classList.add('rotate-180', 'transition-transform', 'duration-500');
    
    setTimeout(() => {
        refreshBtn.classList.remove('rotate-180');
    }, 500);
    
    loadWeatherData(currentCityName);
}

// Favorite cities functionality - UPDATE untuk Font Awesome
function updateFavoriteButton() {
    const currentCityText = document.getElementById('current-city').textContent;
    
    if (currentCityText && currentCityText !== '--') {
        const cityName = currentCityText.split(',')[0].trim();
        const isFavorite = favorites.some(fav => fav.name === cityName);
        
        addFavoriteBtn.classList.remove('hidden');
        
        const favoriteIcon = addFavoriteBtn.querySelector('i');
        if (isFavorite) {
            favoriteIcon.className = 'fas fa-star text-yellow-500';
        } else {
            favoriteIcon.className = 'far fa-star text-gray-400';
        }
    } else {
        addFavoriteBtn.classList.add('hidden');
    }
}

function addCurrentToFavorites() {
    const currentCityText = document.getElementById('current-city').textContent;
    if (currentCityText && currentCityText !== '--') {
        const cityName = currentCityText.split(',')[0].trim();
        const country = currentCityText.split(',')[1] ? currentCityText.split(',')[1].trim() : '';
        
        const isAlreadyFavorite = favorites.some(fav => fav.name === cityName);
        
        if (!isAlreadyFavorite) {
            favorites.push({ name: cityName, country: country });
            localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
            updateFavoriteButton();
            showNotification(`✅ ${cityName} ditambahkan ke favorit`, 'success');
        } else {
            removeFromFavorites(cityName);
        }
    }
}

function removeFromFavorites(cityName) {
    favorites = favorites.filter(fav => fav.name !== cityName);
    localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
    updateFavoriteButton();
    showNotification(`❌ ${cityName} dihapus dari favorit`, 'error');
    if (!favoriteModal.classList.contains('hidden')) {
        showFavoriteModal(); // Refresh modal
    }
}

function showFavoriteModal() {
    favoriteList.innerHTML = '';
    
    if (favorites.length === 0) {
        favoriteList.innerHTML = '<p class="text-slate-500 dark:text-slate-400 text-center py-4">Belum ada kota favorit</p>';
    } else {
        favorites.forEach((city) => {
            const cityElement = document.createElement('div');
            cityElement.className = 'flex justify-between items-center p-3 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors';
            cityElement.innerHTML = `
                <span class="cursor-pointer flex-1 text-slate-700 dark:text-slate-300" onclick="loadFavoriteCity('${city.name}')">
                    ${city.name}${city.country ? `, ${city.country}` : ''}
                </span>
                <button onclick="event.stopPropagation(); removeFromFavorites('${city.name}')" 
                        class="text-red-500 hover:text-red-700 ml-2 p-1 rounded transition-colors"
                        title="Hapus dari favorit">
                    <i class="fas fa-trash text-red-500"></i>
                </button>
            `;
            favoriteList.appendChild(cityElement);
        });
    }
    
    favoriteModal.classList.remove('hidden');
}

function closeFavoriteModal() {
    favoriteModal.classList.add('hidden');
}

function clearAllFavorites() {
    if (favorites.length > 0) {
        favorites = [];
        localStorage.setItem('weatherFavorites', JSON.stringify(favorites));
        showFavoriteModal();
        showNotification('🗑️ Semua favorit dihapus', 'info');
    }
}

function loadFavoriteCity(cityName) {
    currentCityName = cityName;
    loadWeatherData(cityName);
    closeFavoriteModal();
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type} fade-in`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export functions for global use (untuk onclick di HTML)
window.loadFavoriteCity = loadFavoriteCity;
window.removeFromFavorites = removeFromFavorites;