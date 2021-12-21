const mongoose = require("mongoose");

const { MONGO_URI } = process.env;

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect('mongodb://localhost:27017', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    // notifying about successful connection
    .then(() => {
      console.log("Successfully connected to database");
    })
    // notifying about connection issue
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1); // exit with signal 1 which means process exit with error
    });
};