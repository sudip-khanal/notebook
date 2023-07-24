const mongoose = require("mongoose");

ConnectToMOngo = async () => {
  try {
    await mongoose.connect(
      "mongodb://127.0.0.1:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
    );

    console.log("Connected to MongoDB");
    // Your code after successful connection
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
  }
};

module.exports = ConnectToMOngo;
