import express, { urlencoded } from "express";
import { PORT } from "./config.js";

const app = express();

app.use(express.json());
app.use(urlencoded({extended:false}));

app.get('/', (req,res) => {
    res.send('Welcome to this server')
});

app.listen(PORT, () => {
    console.log(`This server is runnig on port ${PORT}`)
});
