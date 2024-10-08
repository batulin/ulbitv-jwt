import express from "express";
import "dotenv/config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./src/routes/index.js";
import {errorHandler} from "./src/middleWare/error.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', router);

app.use(errorHandler);

const start = async () => {
    try{
        app.listen(PORT, () => console.log(`start on port ${PORT}`));

    } catch (err) {
        console.log(err);
    }
}

start();