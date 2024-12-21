const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

const buySellRoutes = require('./routes/buySellRoutes');
const lostFoundRoutes = require('./routes/lostFoundRoutes');

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://namo:namokar@cluster0.s81yo.mongodb.net/Game');

app.use('/api/buySell', buySellRoutes);
app.use('/api/lostFound', lostFoundRoutes);

app.get('/', (req, res) => {
    res.send('Server is running successfully!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
