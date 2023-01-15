require('dotenv').config();
const mongoose = require('mongoose');

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true})

mongoose.connection
.on("open", () => console.log("Connected to Mongo"))
.on("close", () => console.log("Disconnected from Mongo"))
.on("error", (error) => console.log(error))

module.exports = mongoose;
