// ================================================
//  GOTHAM WEATHER — script.js
//  Uses OpenWeatherMap API (free tier)
//  Replace API_KEY below with your own key from:
//  https://openweathermap.org/api
// ================================================

const API_KEY = "52919327737ece5cd7c2a7467b42b577"; // 🦇 Replace this
const BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

// ── Batman quotes mapped to weather conditions ──
const BATMAN_QUOTES = {
  clear:        { q: "Even in the light, Gotham hides its shadows.", author: "Batman" },
  clouds:       { q: "The night is darkest just before the dawn.", author: "Batman" },
  rain:         { q: "Gotham's rain washes the streets — but never the sin.", author: "Batman" },
  drizzle:      { q: "A light rain… good. It keeps the weak indoors.", author: "Batman" },
  thunderstorm: { q: "I am the storm that Gotham deserves.", author: "Batman" },
  snow:         { q: "Gotham freezes, but I do not.", author: "Batman" },
  mist:         { q: "In the fog, even criminals feel fear.", author: "Batman" },
  fog:          { q: "The fog is my ally. Criminals fear what they cannot see.", author: "Batman" },
  haze:         { q: "Gotham's haze… it smells of broken promises.", author: "Batman" },
  default:      { q: "I am vengeance. I am the night. I am Batman.", author: "Batman" },
};

// ── Weather to emoji map ──
const WEATHER_EMOJI = {
  "01d": "☀️", "01n": "🌑",
  "02d": "⛅", "02n": "☁️",
  "03d": "☁️", "03n": "☁️",
  "04d": "☁️", "04n": "☁️",
  "09d": "🌧", "09n": "🌧",
  "10d": "🌦", "10n": "🌧",
  "11d": "⛈", "11n": "⛈",
  "13d": "❄️", "13n": "❄️",
  "50d": "🌫", "50n": "🌫",
};

// ── DOM helpers ──
const $ = id => document.getElementById(id);

function showLoader()  { $("loader").classList.add("show"); }
function hideLoader()  { $("loader").classList.remove("show"); }
function showCard()    { $("weatherCard").classList.add("show"); }
function hideCard()    { $("weatherCard").classList.remove("show"); }
function showError(msg){ $("errorBox").classList.add("show"); $("errorMsg").textContent = msg; }
function hideError()   { $("errorBox").classList.remove("show"); }

// ── Format time from Unix timestamp + timezone offset ──
function formatTime(unix, offsetSec) {
  const d = new Date((unix + offsetSec) * 1000);
  const h = String(d.getUTCHours()).padStart(2, "0");
  const m = String(d.getUTCMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

// ── Format date ──
function formatDate(unix, offsetSec) {
  const d = new Date((unix + offsetSec) * 1000);
  const days   = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return `${days[d.getUTCDay()]}, ${months[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

// ── Get Batman quote for condition ──
function getBatmanQuote(mainCondition) {
  const key = mainCondition.toLowerCase();
  return BATMAN_QUOTES[key] || BATMAN_QUOTES.default;
}

// ── Render weather data ──
function renderWeather(data) {
  const { name, sys, main, weather, wind, visibility, timezone, dt } = data;

  $("cityName").textContent    = name;
  $("countryName").textContent = sys.country;
  $("dateTime").textContent    = formatDate(dt, timezone);

  $("weatherEmoji").textContent = WEATHER_EMOJI[weather[0].icon] || "🌡";
  $("weatherDesc").textContent  = weather[0].description.toUpperCase();

  $("tempMain").textContent  = Math.round(main.temp);
  $("feelsLike").textContent = Math.round(main.feels_like);

  $("humidity").textContent   = `${main.humidity}%`;
  $("wind").textContent       = `${(wind.speed * 3.6).toFixed(1)} km/h`;
  $("visibility").textContent = visibility ? `${(visibility / 1000).toFixed(1)} km` : "N/A";
  $("pressure").textContent   = `${main.pressure} hPa`;
  $("sunrise").textContent    = formatTime(sys.sunrise, timezone);
  $("sunset").textContent     = formatTime(sys.sunset, timezone);

  const quote = getBatmanQuote(weather[0].main);
  $("quoteText").textContent = quote.q;

  // Rain animation based on weather
  const main_cond = weather[0].main.toLowerCase();
  setRainIntensity(main_cond.includes("rain") || main_cond.includes("drizzle") || main_cond.includes("thunderstorm") ? 1 : 0);
}

// ── Fetch weather by city name ──
async function fetchWeather() {
  const city = $("cityInput").value.trim();
  if (!city) { showError("Enter a city name, Commissioner."); return; }

  hideError();
  hideCard();
  showLoader();

  try {
    const url = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    const res  = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      showError(`"${city}" not found in the Batcomputer database.`);
    } else {
      renderWeather(data);
      showCard();
    }
  } catch (err) {
    showError("Batcomputer connection lost. Check your network.");
  } finally {
    hideLoader();
  }
}

// ── Fetch weather by coordinates ──
async function fetchWeatherByCoords(lat, lon) {
  hideError();
  hideCard();
  showLoader();

  try {
    const url = `${BASE_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    const res  = await fetch(url);
    const data = await res.json();

    if (data.cod !== 200) {
      showError("Location data unavailable. Gotham eludes us.");
    } else {
      $("cityInput").value = data.name;
      renderWeather(data);
      showCard();
    }
  } catch (err) {
    showError("Batcomputer connection lost. Check your network.");
  } finally {
    hideLoader();
  }
}

// ── Geolocation ──
function getLocation() {
  if (!navigator.geolocation) {
    showError("Geolocation unsupported in this browser.");
    return;
  }
  navigator.geolocation.getCurrentPosition(
    pos => fetchWeatherByCoords(pos.coords.latitude, pos.coords.longitude),
    ()  => showError("Location access denied. Even Batman respects privacy.")
  );
}

// ── Enter key support ──
$("cityInput").addEventListener("keydown", e => {
  if (e.key === "Enter") fetchWeather();
});

// ── Rain Canvas ──
const canvas = $("rainCanvas");
const ctx    = canvas.getContext("2d");
let rainDrops = [];
let rainActive = false;
let animFrame;

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

function createDrops(count) {
  rainDrops = [];
  for (let i = 0; i < count; i++) {
    rainDrops.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      len: Math.random() * 18 + 8,
      speed: Math.random() * 4 + 3,
      opacity: Math.random() * 0.5 + 0.2,
    });
  }
}

function drawRain() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  rainDrops.forEach(d => {
    ctx.beginPath();
    ctx.moveTo(d.x, d.y);
    ctx.lineTo(d.x - 1, d.y + d.len);
    ctx.strokeStyle = `rgba(180, 210, 255, ${d.opacity})`;
    ctx.lineWidth = 1;
    ctx.stroke();
    d.y += d.speed;
    if (d.y > canvas.height) { d.y = -d.len; d.x = Math.random() * canvas.width; }
  });
  if (rainActive) animFrame = requestAnimationFrame(drawRain);
}

function setRainIntensity(on) {
  rainActive = !!on;
  cancelAnimationFrame(animFrame);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (rainActive) { createDrops(120); drawRain(); }
}

resizeCanvas();
window.addEventListener("resize", () => { resizeCanvas(); if (rainActive) createDrops(120); });

// ── Load with a default city on start ──
window.addEventListener("load", () => {
  $("cityInput").value = "Gotham";
  // Uncomment below after adding your API key:
  // fetchWeather();
});
