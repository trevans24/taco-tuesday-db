'use strict'
// require mongoose
const mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// Define the SCHEMA
const TacoSchema = new Schema ({
	name: String,
	shell: String,
	meat: String,
	toppings: String,
	recipe: String,
	picture: String
});

// Taco Model
const Taco = mongoose.model('Taco', TacoSchema);

// EXPORT MODEL
module.exports = Taco;