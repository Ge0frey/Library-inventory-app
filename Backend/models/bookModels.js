import mongoose from "mongoose";

const bookSchema = mongoose.Schema(
    {
        title: {
            type: string,
            required: true,
        },
        author: {
            type: string,
            required: true,
        },
        publishYear: {
            type: Number,
            required: true,
        }
    },
    {
        timestamps:true,
    }
) 

const Book = mongoose.model('book', bookSchema)