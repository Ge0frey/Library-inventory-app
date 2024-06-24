import express, { urlencoded } from "express";
import { PORT, mongoDbUrl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";

const app = express();

app.use(express.json());
app.use(urlencoded({extended:false}));

app.get('/', (req,res) => {
    res.send('Welcome to this server')
});

app.post ('/books', async (req, res) => {
    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message:`send all required fields: title,author,publishYear`,
            })
        } 
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }

        const book = await Book.create(newBook);

        return res.status(201).send(book)
    } 
    catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
});

app.get('/books', async (req,res) => {
    try {
        const books = await Book.find({})

        return res.status(200).json(
            {
                count: books.length,
                data: books 
            }
        )
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

app.get('/books/:id', async (req,res) => {
    try {

        const {id} = req.params;

        const book = await Book.findById(id)

        const books = await Book.find({})

        return res.status(200).json(book)
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
})

app.put('/books/:id', (req,res) => {
    try {
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message:`send all required fields: title,author,publishYear`,
            })
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message:error.message})
    }
    const {id} = req.params;
})


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