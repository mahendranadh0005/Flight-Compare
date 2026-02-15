# ✈️ Flight Compare AI

AI-powered flight search engine that uses autonomous web agents to browse airline and travel websites in real-time and extract live flight prices.

Instead of manually checking multiple tabs, FlyCompare sends intelligent agents to search flight websites and returns structured results in seconds.

## 🚀 Live Demo

Demo link: https://youtu.be/lVEdeU9dDEw


## How It Works

1. **User enters** origin, destination, and travel date
2. **Backend sends** natural language instructions to TinyFish Web Agent API
3. **AI agent**:
   - Opens official airline / travel websites
   - Fills search forms
   - Waits for results
   - Extracts structured flight data
4. **Backend**:
   - Cleans and normalizes results
   - Sorts by price
   - Returns JSON
5. **Frontend displays**:
   - Airline
   - Departure time
   - Arrival time
   - Price
   - Booking link

## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- TailwindCSS
- shadcn/ui components
- Deployed on Vercel

### Backend
- Node.js
- Express
- Axios
- TinyFish Web Agent API
- Deployed on Render

## Project Structure

```
flight-compare/
│
├── server/               # Express backend
│   ├── routes/
│   └── index.js
│
├── src/                  # React frontend
│   ├── components/
│   ├── pages/
│   └── types/
│
├── public/               # Static assets
├── package.json
└── README.md
```

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/Flight-Compare.git
cd Flight-Compare
```

### 2. Setup Backend

```bash
cd server
npm install
```

Create `.env` file inside `/server`:
```
TINYFISH_KEY=your_tinyfish_api_key
```

Run backend:
```bash
npm run dev
```

Backend runs on: `http://localhost:5000`

### 3. Setup Frontend

Go back to root:
```bash
npm install
```

Create `.env` in root:
```
VITE_API_URL=http://localhost:5000
```

Run frontend:
```bash
npm run dev
```

Frontend runs on: `http://localhost:8080`

## Deployment

### Backend → Render

- **Root directory**: `server`
- **Build command**: `npm install`
- **Start command**: `node index.js`
- **Environment variable**: `TINYFISH_KEY=your_key`

### Frontend → Vercel

- **Framework**: Vite
- **Build command**: `npm run build`
- **Output directory**: `dist`
- **Environment variable**: `VITE_API_URL=https://your-render-backend.onrender.com`

## 🔥 Features

- AI-powered live website browsing
- Real-time price extraction
- Automatic price sorting
- Cheapest flight highlight
- Direct booking links

## 📈 Future Improvements

- Add more airline websites
- Add caching layer (Redis)
- Add price trend tracking
- Add alert system for price drops
- Integrate ML-based price prediction

## 👨‍💻 Author

Mahendra Nadh Jujapu


