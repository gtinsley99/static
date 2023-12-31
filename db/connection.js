const mongoose = require("mongoose");

const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Succesfully connected to the Mongo DB database");
    } catch (error) {
        console.log(error);
    }
};

connection();