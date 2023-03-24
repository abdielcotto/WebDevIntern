const mongoose = require("mongoose");

const kidSchema = new mongoose.Schema({
    name: String,
});

const Kid = mongoose.model("Kid", kidSchema);

module.exports = Kid;