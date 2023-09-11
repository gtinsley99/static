require("dotenv").config();
require("./db/connection");
const { default: mongoose } = require("mongoose");
const Book = require("./models/books");

// Imports the express library
const express = require("express");

// Renames express to app as per conventional usage
const app = express();

// Allows us to decide which port number to assign
const port = process.env.PORT;

app.use(express.json());

// Add new book to database
app.post("/books/addabook", async (req, res) => {
    console.log("Request body is:", req.body);

    const newBook = await Book.create(
        {
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre
    })

    const successResponse = {
        message: "Book added successfully",
        book: newBook
    }

    res.status(201).json(successResponse);
});

// Update item in database
app.put("/updatebook/:id", async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);

        if (!book){
            return res.json({
                success:false,
                message: "Book not found"
            });
        } else {
            const updateBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                runValidator: true
            });
            res.json({
                message: "Book updated successfully",
                book: updateBook
            });
        }

    } catch (error) {
        console.log(error);
    }
})

// Show item in database
app.get("/books/listallbooks", async(req, res) => {
    const allBooks = await Book.find({});
    console.log("All books on this database are:", allBooks);

    const successResponse = {
        message: "Succesfully read",
        books: allBooks
    };

    res.status(218).json(successResponse);
})

// Delete item from database
app.delete("/deletebook/:id", async (req, res) => {
    try{
        const book = await Book.findById(req.params.id);

        if (!book){
            return res.json({
                success:false,
                message: "Book not found"
            });
        } else {
            const deleteBook = await Book.findByIdAndDelete(req.params.id);
            res.json({
                message: "Book deleted successfully",
                book: deleteBook
            });
        }

    } catch (error) {
        console.log(error);
    }
})




// express.static("public") sets up a static webserver pulling files from the public folder
// app.use creates a route so that when we type in localhost:5001/public it follows this route
// app.use("/public", express.static("public"));

// This is the listener function which only listens into http request on port 5001, the anonymous function runs just once when the listener is set up
app.listen(port, () => console.log(`Server is listening on port ${port}`));
