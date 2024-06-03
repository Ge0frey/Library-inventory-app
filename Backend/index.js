import express, { urlencoded } from "express";
import { PORT, mongodbURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(urlencoded({extended:false}));

app.get('/', (req,res) => {
    res.send('Welcome to this server')
});

mongoose
.connect (mongodbURL)
.then(() => {
    console.log('App connected to database successfully');
    app.listen(PORT, () => {
        console.log(`This server is running on port ${PORT}`)
    });
})
.catch((error) => {
    console.log(error)
})