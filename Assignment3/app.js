/**
 * SkyPulse Weather Application
 * Built with Fetch API, JSON parsing, and Vanilla JS
 * OpenWeatherMap Integration with Demo Fallback
 */

(function () {
  'use strict';

  // --- Configuration & Constants ---
  const STORAGE_KEYS = {
    API_KEY: 'skypulse_owm_api_key',
    UNIT: 'skypulse_unit',
    RECENT: 'skypulse_recent_cities',
    LAST_CITY: 'skypulse_last_searched'
  };

  const DEFAULT_CITY = 'London';
  const BASE_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  // State
  let currentUnit = localStorage.getItem(STORAGE_KEYS.UNIT) || 'metric';
  let apiKey = localStorage.getItem(STORAGE_KEYS.API_KEY) || '';
  let currentWeatherData = null;

  // Realistic mock data repository for seamless demo experience
  const MOCK_WEATHER_DATABASE = {
    'london': {
      name: 'London',
      country: 'GB',
      temp: 18.5,
      temp_min: 15.0,
      temp_max: 21.2,
      feels_like: 17.8,
      humidity: 72,
      pressure: 1014,
      visibility: 10000,
      wind_speed: 4.6,
      wind_deg: 240,
      condition_main: 'Clouds',
      condition_desc: 'scattered clouds',
      icon: '03d'
    },
    'new york': {
      name: 'New York',
      country: 'US',
      temp: 24.2,
      temp_min: 21.0,
      temp_max: 27.5,
      feels_like: 25.1,
      humidity: 55,
      pressure: 1018,
      visibility: 10000,
      wind_speed: 3.1,
      wind_deg: 180,
      condition_main: 'Clear',
      condition_desc: 'clear sky',
      icon: '01d'
    },
    'tokyo': {
      name: 'Tokyo',
      country: 'JP',
      temp: 28.0,
      temp_min: 24.5,
      temp_max: 31.0,
      feels_like: 30.5,
      humidity: 68,
      pressure: 1009,
      visibility: 9000,
      wind_speed: 2.8,
      wind_deg: 130,
      condition_main: 'Rain',
      condition_desc: 'light rain shower',
      icon: '10d'
    },
    'paris': {
      name: 'Paris',
      country: 'FR',
      temp: 20.8,
      temp_min: 17.0,
      temp_max: 23.4,
      feels_like: 20.2,
      humidity: 62,
      pressure: 1016,
      visibility: 10000,
      wind_speed: 3.6,
      wind_deg: 210,
      condition_main: 'Clouds',
      condition_desc: 'broken clouds',
      icon: '04d'
    },
    'sydney': {
      name: 'Sydney',
      country: 'AU',
      temp: 16.4,
      temp_min: 13.0,
      temp_max: 19.5,
      feels_like: 15.8,
      humidity: 60,
      pressure: 1022,
      visibility: 10000,
      wind_speed: 5.2,
      wind_deg: 160,
      condition_main: 'Clear',
      condition_desc: 'mostly sunny',
      icon: '01d'
    },
    'mumbai': {
      name: 'Mumbai',
      country: 'IN',
      temp: 31.5,
      temp_min: 28.0,
      temp_max: 33.2,
      feels_like: 37.0,
      humidity: 82,
      pressure: 1006,
      visibility: 6000,
      wind_speed: 4.1,
      wind_deg: 270,
      condition_main: 'Rain',
      condition_desc: 'heavy intensity rain',
      icon: '09d'
    }
  };

  // --- DOM Elements ---
  const elements = {
    form: document.getElementById('weather-form'),
    cityInput: document.getElementById('city-input'),
    clearInputBtn: document.getElementById('clear-input-btn'),
    searchBtn: document.getElementById('search-btn'),
    chipBtns: document.querySelectorAll('.chip-btn'),
    
    // States
    loadingState: document.getElementById('loading-state'),
    errorState: document.getElementById('error-state'),
    errorTitle: document.getElementById('error-title'),
    errorMessage: document.getElementById('error-message'),
    errorRetryBtn: document.getElementById('error-retry-btn'),
    weatherCard: document.getElementById('weather-card'),
    
    // Weather Card Details
    cityName: document.getElementById('city-name'),
    countryBadge: document.getElementById('country-badge'),
    localTime: document.getElementById('local-time'),
    weatherIconImg: document.getElementById('weather-icon-img'),
    conditionBadge: document.getElementById('condition-badge'),
    tempDisplay: document.getElementById('temp-display'),
    tempUnitSymbol: document.getElementById('temp-unit-symbol'),
    tempMax: document.getElementById('temp-max'),
    tempMin: document.getElementById('temp-min'),
    feelsLike: document.getElementById('feels-like'),
    humidityValue: document.getElementById('humidity-value'),
    humidityBar: document.getElementById('humidity-bar'),
    windValue: document.getElementById('wind-value'),
    windDirection: document.getElementById('wind-direction'),
    conditionMain: document.getElementById('condition-main'),
    conditionDetail: document.getElementById('condition-detail'),
    pressureValue: document.getElementById('pressure-value'),
    visibilityValue: document.getElementById('visibility-value'),
    recentRow: document.getElementById('recent-searches-row'),
    recentButtons: document.getElementById('recent-buttons'),
    
    // Unit Toggles
    unitC: document.getElementById('unit-c'),
    unitF: document.getElementById('unit-f'),
    
    // Mode indicator & API Modal
    modeIndicator: document.getElementById('mode-indicator-bar'),
    modeText: document.getElementById('mode-text'),
    switchToApiBtn: document.getElementById('switch-to-api-btn'),
    openApiModalBtn: document.getElementById('open-api-modal-btn'),
    apiModal: document.getElementById('api-modal'),
    closeModalBtn: document.getElementById('close-modal-btn'),
    apiKeyInput: document.getElementById('api-key-input'),
    saveKeyBtn: document.getElementById('save-key-btn'),
    clearKeyBtn: document.getElementById('clear-key-btn'),
    useDemoModeBtn: document.getElementById('use-demo-mode-btn')
  };

  // --- Initializer ---
  function init() {
    setupEventListeners();
    updateModeIndicator();
    updateUnitButtons();
    renderRecentSearches();

    // Load initial city
    const initialCity = localStorage.getItem(STORAGE_KEYS.LAST_CITY) || DEFAULT_CITY;
    fetchWeatherData(initialCity);
  }

  // --- Event Listeners ---
  function setupEventListeners() {
    // Form Submit
    elements.form.addEventListener('submit', function (e) {
      e.preventDefault();
      const city = elements.cityInput.value.trim();
      if (city) {
        fetchWeatherData(city);
      }
    });

    // Input clear button toggle
    elements.cityInput.addEventListener('input', function () {
      elements.clearInputBtn.style.display = this.value ? 'flex' : 'none';
    });

    elements.clearInputBtn.addEventListener('click', function () {
      elements.cityInput.value = '';
      elements.clearInputBtn.style.display = 'none';
      elements.cityInput.focus();
    });

    // Popular City Chips
    elements.chipBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        const city = this.getAttribute('data-city');
        elements.cityInput.value = city;
        elements.clearInputBtn.style.display = 'flex';
        fetchWeatherData(city);
      });
    });

    // Retry Button
    elements.errorRetryBtn.addEventListener('click', function () {
      const city = elements.cityInput.value.trim() || DEFAULT_CITY;
      fetchWeatherData(city);
    });

    // Unit toggle buttons
    elements.unitC.addEventListener('click', function () {
      setUnit('metric');
    });

    elements.unitF.addEventListener('click', function () {
      setUnit('imperial');
    });

    // API Modal Handlers
    elements.openApiModalBtn.addEventListener('click', openModal);
    elements.switchToApiBtn.addEventListener('click', openModal);
    elements.closeModalBtn.addEventListener('click', closeModal);

    elements.apiModal.addEventListener('click', function (e) {
      if (e.target === elements.apiModal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && elements.apiModal.style.display === 'flex') {
        closeModal();
      }
    });

    elements.saveKeyBtn.addEventListener('click', saveApiKey);
    elements.clearKeyBtn.addEventListener('click', clearApiKey);
    elements.useDemoModeBtn.addEventListener('click', function () {
      clearApiKey();
      closeModal();
    });
  }

  // --- Unit Toggle Management ---
  function setUnit(unit) {
    if (currentUnit === unit) return;
    currentUnit = unit;
    localStorage.setItem(STORAGE_KEYS.UNIT, unit);
    updateUnitButtons();

    // Re-render current weather with converted units without extra fetch if cached, or re-fetch
    if (currentWeatherData) {
      const city = currentWeatherData.name;
      fetchWeatherData(city);
    }
  }

  function updateUnitButtons() {
    if (currentUnit === 'metric') {
      elements.unitC.classList.add('active');
      elements.unitF.classList.remove('active');
    } else {
      elements.unitF.classList.add('active');
      elements.unitC.classList.remove('active');
    }
  }

  // --- API Key & Mode UI ---
  function updateModeIndicator() {
    if (apiKey) {
      elements.modeIndicator.className = 'mode-indicator api-mode';
      elements.modeText.textContent = 'Live OpenWeatherMap API Active';
      elements.switchToApiBtn.textContent = 'Change Key';
    } else {
      elements.modeIndicator.className = 'mode-indicator demo-mode';
      elements.modeText.textContent = 'Demo Mode (API key optional)';
      elements.switchToApiBtn.textContent = 'Add API Key';
    }
  }

  function openModal() {
    elements.apiKeyInput.value = apiKey;
    elements.apiModal.style.display = 'flex';
    elements.apiKeyInput.focus();
  }

  function closeModal() {
    elements.apiModal.style.display = 'none';
  }

  function saveApiKey() {
    const key = elements.apiKeyInput.value.trim();
    if (key) {
      apiKey = key;
      localStorage.setItem(STORAGE_KEYS.API_KEY, key);
      updateModeIndicator();
      closeModal();
      // Re-fetch current city with new API key
      const city = elements.cityInput.value.trim() || DEFAULT_CITY;
      fetchWeatherData(city);
    } else {
      clearApiKey();
      closeModal();
    }
  }

  function clearApiKey() {
    apiKey = '';
    localStorage.removeItem(STORAGE_KEYS.API_KEY);
    elements.apiKeyInput.value = '';
    updateModeIndicator();
    if (currentWeatherData) {
      fetchWeatherData(currentWeatherData.name);
    }
  }

  // --- Core Fetch API & JSON Parsing ---
  async function fetchWeatherData(cityName) {
    showLoading();

    try {
      if (apiKey) {
        // Live Fetch via OpenWeatherMap API
        const url = `${BASE_API_URL}?q=${encodeURIComponent(cityName)}&units=${currentUnit}&appid=${apiKey}`;
        
        const response = await fetch(url);
        
        // JSON parsing
        const data = await response.json();

        if (!response.ok) {
          handleApiError(response.status, data.message || 'Failed to fetch weather data');
          return;
        }

        // Parse and render parsed JSON
        const parsed = parseOpenWeatherData(data);
        displayWeather(parsed);
        saveRecentSearch(parsed.name);
        localStorage.setItem(STORAGE_KEYS.LAST_CITY, parsed.name);
      } else {
        // Simulated network latency for realistic UX in demo mode
        await new Promise(resolve => setTimeout(resolve, 380));
        
        const mockData = getMockWeatherData(cityName, currentUnit);
        if (!mockData) {
          showError('City Not Found (Demo Mode)', `"${cityName}" is not in the demo database. Try London, New York, Tokyo, Paris, Sydney, Mumbai, or add your OpenWeatherMap key to search any city worldwide.`);
          return;
        }

        displayWeather(mockData);
        saveRecentSearch(mockData.name);
        localStorage.setItem(STORAGE_KEYS.LAST_CITY, mockData.name);
      }
    } catch (err) {
      console.error('Fetch error:', err);
      showError('Network Error', 'Unable to reach the weather service. Please check your internet connection and try again.');
    }
  }

  // Parses raw JSON payload from OpenWeatherMap endpoint
  function parseOpenWeatherData(data) {
    const weather = data.weather && data.weather[0] ? data.weather[0] : {};
    const main = data.main || {};
    const wind = data.wind || {};
    const sys = data.sys || {};

    return {
      name: data.name || 'Unknown',
      country: sys.country || '',
      temp: main.temp,
      temp_min: main.temp_min,
      temp_max: main.temp_max,
      feels_like: main.feels_like,
      humidity: main.humidity,
      pressure: main.pressure,
      visibility: data.visibility || 10000,
      wind_speed: wind.speed || 0,
      wind_deg: wind.deg || 0,
      condition_main: weather.main || 'Clear',
      condition_desc: weather.description || 'Clear sky',
      icon: weather.icon || '01d',
      timezone: data.timezone || 0
    };
  }

  // Generates or retrieves realistic mock data for demo mode
  function getMockWeatherData(cityName, unit) {
    const query = cityName.trim().toLowerCase();
    let entry = MOCK_WEATHER_DATABASE[query];

    // If city not in standard dictionary, generate consistent mock weather using simple hash
    if (!entry) {
      let hash = 0;
      for (let i = 0; i < query.length; i++) {
        hash = (hash << 5) - hash + query.charCodeAt(i);
        hash |= 0;
      }
      const absHash = Math.abs(hash);
      const conditions = [
        { main: 'Clear', desc: 'clear sky', icon: '01d' },
        { main: 'Clouds', desc: 'few clouds', icon: '02d' },
        { main: 'Clouds', desc: 'scattered clouds', icon: '03d' },
        { main: 'Rain', desc: 'light rain', icon: '10d' },
        { main: 'Thunderstorm', desc: 'thunderstorm with rain', icon: '11d' },
        { main: 'Snow', desc: 'light snow', icon: '13d' }
      ];
      const cond = conditions[absHash % conditions.length];
      const baseTemp = 12 + (absHash % 22);

      entry = {
        name: cityName.charAt(0).toUpperCase() + cityName.slice(1),
        country: 'INTL',
        temp: baseTemp,
        temp_min: baseTemp - 3,
        temp_max: baseTemp + 4,
        feels_like: baseTemp + 1,
        humidity: 40 + (absHash % 55),
        pressure: 1005 + (absHash % 25),
        visibility: 8000 + (absHash % 4000),
        wind_speed: 2 + (absHash % 8),
        wind_deg: (absHash * 37) % 360,
        condition_main: cond.main,
        condition_desc: cond.desc,
        icon: cond.icon
      };
    }

    // Convert from metric base if imperial is active
    if (unit === 'imperial') {
      return {
        ...entry,
        temp: cToF(entry.temp),
        temp_min: cToF(entry.temp_min),
        temp_max: cToF(entry.temp_max),
        feels_like: cToF(entry.feels_like),
        wind_speed: +(entry.wind_speed * 2.23694).toFixed(1)
      };
    }

    return entry;
  }

  function cToF(c) {
    return +((c * 9) / 5 + 32).toFixed(1);
  }

  // --- Display Weather UI ---
  function displayWeather(data) {
    currentWeatherData = data;

    // Header Details
    elements.cityName.textContent = data.name;
    elements.countryBadge.textContent = data.country || '–';
    elements.countryBadge.style.display = data.country ? 'inline-block' : 'none';
    
    // Formatted time
    const now = new Date();
    elements.localTime.textContent = `Updated ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    // Main Temperature
    const tempRounded = Math.round(data.temp);
    elements.tempDisplay.textContent = isNaN(tempRounded) ? '--' : tempRounded;
    elements.tempUnitSymbol.textContent = currentUnit === 'metric' ? '°C' : '°F';

    // Extremes and Feels like
    const maxVal = Math.round(data.temp_max);
    const minVal = Math.round(data.temp_min);
    elements.tempMax.textContent = isNaN(maxVal) ? '--' : `${maxVal}°`;
    elements.tempMin.textContent = isNaN(minVal) ? '--' : `${minVal}°`;
    elements.feelsLike.textContent = `${Math.round(data.feels_like)}${currentUnit === 'metric' ? '°C' : '°F'}`;

    // Conditions and Visuals
    elements.conditionBadge.textContent = data.condition_desc || data.condition_main;
    elements.conditionMain.textContent = data.condition_main;
    elements.conditionDetail.textContent = data.condition_desc;

    // Set weather icon
    const iconCode = data.icon || '01d';
    elements.weatherIconImg.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    elements.weatherIconImg.alt = data.condition_desc || 'Weather icon';

    // Humidity (Specified Output)
    const humidity = Math.min(100, Math.max(0, Math.round(data.humidity)));
    elements.humidityValue.textContent = `${humidity}%`;
    elements.humidityBar.style.width = `${humidity}%`;

    // Wind Speed & Direction
    const windSpeedUnit = currentUnit === 'metric' ? 'm/s' : 'mph';
    elements.windValue.textContent = `${data.wind_speed} ${windSpeedUnit}`;
    elements.windDirection.textContent = `Wind Angle: ${data.wind_deg ?? 0}°`;

    // Pressure & Visibility
    elements.pressureValue.textContent = `${data.pressure} hPa`;
    const visKm = data.visibility ? (data.visibility / 1000).toFixed(1) : '10.0';
    elements.visibilityValue.textContent = `Visibility: ${visKm} km`;

    // Apply Dynamic Theme based on weather conditions
    applyWeatherTheme(data.condition_main);

    // Show Card
    showCard();
  }

  // --- Dynamic Atmospheric Themes ---
  function applyWeatherTheme(condition) {
    document.body.className = ''; // Reset
    const cond = (condition || '').toLowerCase();

    if (cond.includes('clear')) {
      document.body.classList.add('theme-clear');
    } else if (cond.includes('cloud')) {
      document.body.classList.add('theme-clouds');
    } else if (cond.includes('rain') || cond.includes('drizzle')) {
      document.body.classList.add('theme-rain');
    } else if (cond.includes('thunder') || cond.includes('storm')) {
      document.body.classList.add('theme-thunderstorm');
    } else if (cond.includes('snow')) {
      document.body.classList.add('theme-snow');
    } else if (['mist', 'fog', 'haze', 'smoke', 'dust'].some(term => cond.includes(term))) {
      document.body.classList.add('theme-atmosphere');
    } else {
      document.body.classList.add('theme-default');
    }
  }

  // --- Error Handling ---
  function handleApiError(statusCode, message) {
    if (statusCode === 404) {
      showError('City Not Found', 'Could not locate the requested city. Please verify spelling and try again.');
    } else if (statusCode === 401) {
      showError('Invalid API Key', 'The OpenWeatherMap API key provided is invalid or inactive. Please check your key in settings or use Demo Mode.');
    } else if (statusCode === 429) {
      showError('Rate Limit Exceeded', 'You have surpassed the free OpenWeatherMap request limit. Please wait a moment before trying again.');
    } else {
      showError('API Request Error', message || 'An unexpected error occurred while fetching weather data.');
    }
  }

  // --- UI State Toggles ---
  function showLoading() {
    elements.loadingState.style.display = 'flex';
    elements.errorState.style.display = 'none';
    elements.weatherCard.style.display = 'none';
  }

  function showCard() {
    elements.loadingState.style.display = 'none';
    elements.errorState.style.display = 'none';
    elements.weatherCard.style.display = 'flex';
  }

  function showError(title, message) {
    elements.loadingState.style.display = 'none';
    elements.weatherCard.style.display = 'none';
    elements.errorState.style.display = 'flex';
    elements.errorTitle.textContent = title;
    elements.errorMessage.textContent = message;
  }

  // --- Recent Searches ---
  function saveRecentSearch(city) {
    if (!city) return;
    let recents = getRecentSearches();
    recents = recents.filter(c => c.toLowerCase() !== city.toLowerCase());
    recents.unshift(city);
    if (recents.length > 5) recents.pop();

    localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(recents));
    renderRecentSearches();
  }

  function getRecentSearches() {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.RECENT);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function renderRecentSearches() {
    const recents = getRecentSearches();
    if (recents.length === 0) {
      elements.recentRow.style.display = 'none';
      return;
    }

    elements.recentRow.style.display = 'flex';
    elements.recentButtons.innerHTML = '';

    recents.forEach(function (city) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'recent-btn';
      btn.textContent = city;
      btn.addEventListener('click', function () {
        elements.cityInput.value = city;
        elements.clearInputBtn.style.display = 'flex';
        fetchWeatherData(city);
      });
      elements.recentButtons.appendChild(btn);
    });
  }

  // Bootstrap when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
