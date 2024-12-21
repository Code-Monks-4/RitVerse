const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config({ path: '../.env' });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server listening on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Server failed to start:", error);
    });
