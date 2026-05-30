# NewsNest — Responsive News Aggregator

A responsive news aggregator app built with **React.js**, **SASS**, and **Bootstrap Grid**.  
Features category filters, live search, dark/light theme toggle, and real-time article cards via NewsAPI.

## 🛠 Tech Stack

- **React.js** (hooks: useState, useEffect, useCallback)
- **SASS** (variables, nesting, responsive mixins)
- **Bootstrap 5 Grid** (responsive layout)
- **NewsAPI.org** (REST API for live headlines)

## 🚀 Getting Started

### 1. Clone & Install

```bash
git clone https://github.com/YOUR_USERNAME/newsnest.git
cd newsnest
npm install
```

### 2. Get a Free API Key

1. Go to [https://newsapi.org](https://newsapi.org) and sign up (free)
2. Copy your API key

### 3. Add Your API Key

Open `src/App.jsx` and replace line 8:

```js
const API_KEY = 'YOUR_NEWSAPI_KEY_HERE';
```

with your actual key:

```js
const API_KEY = 'abc123yourkey';
```

### 4. Run the App

```bash
npm start
```

App opens at `http://localhost:3000`

### 5. Build for Production

```bash
npm run build
```

## ✨ Features

- 📰 Live news from 6 categories: Tech, Science, Business, World, Sports, Health
- 🔍 Real-time search filtering across headlines and descriptions
- 🌙 Dark / Light theme toggle
- 📊 Stats bar showing article count, categories, and sources
- 📱 Fully responsive — works on mobile, tablet, and desktop
- 🃏 Article cards with image, badge, source, and timestamp
- 🔄 Demo mode with sample data when no API key is set

## 📁 Project Structure

```
newsnest/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── NewsCard.jsx
│   ├── styles/
│   │   └── main.scss
│   ├── App.jsx
│   └── index.js
├── package.json
└── README.md
```

## 📝 License

MIT
