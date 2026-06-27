# 🦇 GothamWeather — Dark Knight Forecast

> *"I am vengeance. I am the night. I am the Weather App."*

A Batman-themed weather application built with **HTML, CSS & JavaScript** that displays real-time weather data for any city in the world — through the lens of Gotham's Caped Crusader.

---

## 🌐 Live Demo

👉 **[View Live Site](https://YOUR-USERNAME.github.io/batman-weather-app/)**
*(Replace YOUR-USERNAME with your GitHub username after deploying)*

---

## 📸 Features

- 🦇 **Batman-themed dark UI** — Gotham-black palette, yellow bat accents, and animated bat logo
- 🌧 **Animated rain** — rain canvas activates automatically on rainy conditions
- 🌡 **Real-time weather data** — temperature, humidity, wind, visibility, pressure, sunrise & sunset
- 📍 **Geolocation support** — detect and fetch weather for your current location
- 💬 **Batman quotes** — unique quotes dynamically matched to the current weather condition
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- ⌨️ **Keyboard friendly** — press Enter to search

---

## 🛠 Tech Stack

| Tech | Purpose |
|------|---------|
| HTML5 | Structure & semantic markup |
| CSS3 | Batman-themed styling, animations, grid layout |
| Vanilla JavaScript | API calls, DOM manipulation, canvas rain |
| [OpenWeatherMap API](https://openweathermap.org/api) | Live weather data (free tier) |
| Google Fonts | Bebas Neue · Rajdhani · Share Tech Mono |

---

## 📁 Project Structure

```
batman-weather-app/
│
├── index.html       ← Main HTML page
├── style.css        ← Batman dark theme stylesheet
├── script.js        ← Weather logic + rain canvas + Batman quotes
└── README.md        ← This file
```

---

## 🚀 Getting Started

### Step 1 — Get a Free API Key

1. Go to [https://openweathermap.org/api](https://openweathermap.org/api)
2. Sign up for a **free account**
3. Navigate to **My API Keys** in your dashboard
4. Copy your API key (it activates within ~10 minutes)

### Step 2 — Add Your API Key

Open `script.js` and replace line 9:

```javascript
const API_KEY = "YOUR_API_KEY_HERE"; // 🦇 Replace this
```

with your actual key:

```javascript
const API_KEY = "abc123youractualkey";
```

### Step 3 — Run Locally

Just open `index.html` in any modern browser — no build tools needed.

```bash
# Or serve it with Python
python -m http.server 8000
# Then open http://localhost:8000
```

---

## ☁️ Deployment Guide — GitHub Pages (Free Hosting)

### Step 1 — Create a GitHub Repository

1. Go to [github.com](https://github.com) → **New Repository**
2. Name it: `batman-weather-app`
3. Set visibility to **Public**
4. Click **Create repository**

### Step 2 — Upload Files

**Option A — GitHub Web UI (Easiest)**
1. In your new repo, click **Add file → Upload files**
2. Drag and drop all 3 files: `index.html`, `style.css`, `script.js`
3. Write commit message: `🦇 Initial commit - Gotham Weather`
4. Click **Commit changes**

**Option B — Git CLI**
```bash
git init
git add .
git commit -m "🦇 Initial commit - Gotham Weather"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/batman-weather-app.git
git push -u origin main
```

### Step 3 — Enable GitHub Pages

1. Go to your repo → **Settings** tab
2. Scroll down to **Pages** (left sidebar)
3. Under **Source**, select: `Deploy from a branch`
4. Choose **Branch: main** → Folder: `/ (root)`
5. Click **Save**

### Step 4 — Access Your Live Site

After 1–2 minutes, your site will be live at:

```
https://YOUR-USERNAME.github.io/batman-weather-app/
```

✅ Share this link — it's your public live weather app!

---

## 🔧 Customization

| What to change | Where |
|---------------|-------|
| Default city on load | `script.js` → `$("cityInput").value = "Gotham"` |
| Batman quotes | `script.js` → `BATMAN_QUOTES` object |
| Color palette | `style.css` → `:root` CSS variables |
| Rain drop count | `script.js` → `createDrops(120)` |
| Temperature unit | Change `units=metric` to `units=imperial` in API URL |

---

## ⚠️ Known Limitations

- The free OpenWeatherMap API key may take up to 2 hours to activate after signup
- API calls are limited to **60 requests/minute** on the free tier
- No forecast data (current weather only) — upgrade to a paid plan for 5-day forecast

---

## 📜 License

MIT License — use freely, fork boldly, deploy anywhere.

---

## 👤 Author

Built as **Project 4** of the Web Development curriculum.  
Gotham-themed by the Caped Coder. 🦇

---

> *"It's not who I am underneath, but what I commit to GitHub that defines me."*
