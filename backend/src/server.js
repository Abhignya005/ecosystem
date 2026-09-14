const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const buildingRoutes = require('./routes/buildingRoutes');
const resourceRoutes = require('./routes/resourceRoutes');
const anomalyRoutes = require('./routes/anomalyRoutes');
const ticketRoutes = require('./routes/ticketRoutes');
const simulatorRoutes = require('./routes/simulatorRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const { initAnomalyScheduler } = require('./services/anomalyService');

app.use('/api/auth', authRoutes);
app.use('/api/buildings', buildingRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/anomalies', anomalyRoutes);
app.use('/api/tickets', ticketRoutes);
app.use('/api/simulator', simulatorRoutes);
app.use('/api/leaderboard', leaderboardRoutes);

app.get('/', (req, res) => {
  res.send('EcoCampus API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  initAnomalyScheduler();
});
