import express from 'express';
import { connectDB } from './config/connectDB.js';
import router from './routes/index.routes.js';
import { config } from 'dotenv';
config();

const PORT = process.env.PORT;
const app = express();

connectDB();

app.use(express.json());
app.use('/api', router);

async function startApp() {
    try {
        app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
    } catch (error) {
        console.log(`Error on run server: ${error}`);
    }
}

startApp();
