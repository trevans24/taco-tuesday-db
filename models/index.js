'use strict'
// Require Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI || 
								process.env.MONGOLAB_URI || 
                process.env.MONGOHQ_URL ||
               	'mongodb://localhost/tacos');

// Export
module.exports.Taco = require('./tacos.js');