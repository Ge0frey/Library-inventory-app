import express, { urlencoded } from "express";
import { PORT, mongoDbUrl } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(urlencoded({extended:false}));

app.get('/', (req,res) => {
    res.send('Welcome to this server')
});

mongoose
.connect(mongoDbUrl)
.then(() => {
    console.log(`The app is connected to the database`);
    app.listen(PORT, () => {
        console.log(`This server is running on port ${PORT}`)
    });
})
.catch((error) => {
    console.error(error);
})