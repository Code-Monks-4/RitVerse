const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');


dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://namo:namokar@cluster0.s81yo.mongodb.net/RitVerse');

const authRoutes = require('./routes/authRoutes'); 
const buySellRoutes = require('./routes/buySellRoutes');
const lostFoundRoutes = require('./routes/lostFoundRoutes');
const connectRoutes = require('./routes/connectRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/buySell', buySellRoutes);
app.use('/api/lostFound', lostFoundRoutes);
app.use('/api/session',connectRoutes);

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
