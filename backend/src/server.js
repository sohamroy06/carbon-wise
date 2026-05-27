const express = require('express');
const cors = require('cors');
const path = require('path');
const { initDb, queryAll } = require('./db');

const vehiclesRouter = require('./routes/vehicles');
const calculateRouter = require('./routes/calculate');
const gridRouter = require('./routes/grid');

const app = express();
const PORT = process.env.PORT || 3001;
const allowedOrigins = (process.env.CORS_ORIGIN || process.env.CORS_ORIGINS || '')
  .split(',')
  .map(origin => origin.trim())
  .filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Carbon-Wise API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Routes
app.use('/api/vehicles', vehiclesRouter);
app.use('/api/calculate', calculateRouter);
app.use('/api/grid-intensity', gridRouter);

// Fuel prices endpoint
app.get('/api/fuel-prices', (req, res) => {
  const { state } = req.query;
  
  let query = 'SELECT * FROM fuel_prices';
  const params = [];
  
  if (state) {
    query += ' WHERE state_name = ?';
    params.push(state);
  }
  
  query += ' ORDER BY state_name, fuel_type';
  const prices = queryAll(query, params);
  res.json({ prices });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Initialize DB then start server
initDb().then(() => {
  app.listen(PORT, () => {
    console.log(`
  ╔══════════════════════════════════════════════════╗
  ║          🌿 Carbon-Wise API Server 🌿           ║
  ║──────────────────────────────────────────────────║
  ║  Running on: http://localhost:${PORT}              ║
  ║  Health:     http://localhost:${PORT}/api/health    ║
  ║  Vehicles:   http://localhost:${PORT}/api/vehicles  ║
  ╚══════════════════════════════════════════════════╝
    `);
  });
}).catch(err => {
  console.error('Failed to initialize database:', err);
  process.exit(1);
});

module.exports = app;
