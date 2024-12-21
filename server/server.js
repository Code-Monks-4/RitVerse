import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config({ path: '../.env' }); 

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}).catch((error) => {
    console.error("Server failed to start:", error);
});
