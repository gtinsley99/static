// Imports the express library
const express = require("express");

// Renames express to app as per conventional usage
const app = express();

// Allows us to decide which port number to assign
const port = 5001;



// express.static("public") sets up a static webserver pulling files from the public folder
// app.use creates a route so that when we type in localhost:5001/public it follows this route
// app.use("/public", express.static("public"));

// This is the listener function which only listens into http request on port 5001, the anonymous function runs just once when the listener is set up
app.listen(port, () => console.log(`Server is listening on port ${port}`));
