'use strict'
// for heroku deployment
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./models/');

// FOR ACCESS FROM OUTSIDE SOURCE
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// Body Parser for JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Show API ENDPOINTS
app.get('/api', function api_index(req, res) {
	res.json({
		message: 'Welcome to Taco Tuesday API',
		base_url: 'https://',
		endpoints: [
		{
			method: 'GET',
			path: '/api/tacos',
			description: 'Get all of the tacos'
		},
		{
			method: 'POST',
			path: '/api/tacos',
			description: 'Add a new taco to the DB'
		},
		{
			method: 'SHOW',
			path: '/api/tacos/:id',
			description: 'Get one taco from the DB'
		},
		{
			method: 'PUT',
			path: '/api/tacos/;id',
			description: 'Update a taco'
		},
		{
			method: 'DELETE',
			path: '/api/tacos/:id',
			description: 'Delete a taco'
		}
		]
	});
});

// API CALLS
// INDEX
app.get('/api/tacos', (req, res) => {
	db.Taco.find()
		.exec((err,tacos) => {
			if(err) {
				console.log('Getting Taco Error: ', err);
			}
			res.json(tacos);
		});
});

// SHOW
app.get('/api/tacos/:id', (req, res) => {
	db.Taco.findOne({ _id: req.params.id }, (err, data) =>{
		res.send(data);
	});
});

// POST
app.post('/api/tacos', (req, res) => {
	let newTaco = new db.Taco({
		name: req.body.name,
		shell: req.body.shell,
		meat: req.body.meat,
		toppings: req.body.toppings,
		recipe: req.body.recipe,
		picture: req.body.picture,
	});
	console.log(req.body);
	newTaco.save((err, taco) => {
		if(err) {
			console.log('New Taco Save Error: ', err);
		}
		console.log('Saved new taco: ', taco.name);
		console.log(taco);
		// res.end();
		res.json(taco);
	});
});

// PUT
app.put('/api/tacos/:id', (req, res) => {
	db.Taco.findOne({ _id: req.params.id }, (err, foundTaco) => {
		if(err) {
			console.log('Getting Updated Taco Error: ', err);
		}
		foundTaco.id = req.params.id;
		foundTaco.name = req.body.name;
		foundTaco.shell = req.body.shell;
		foundTaco.meat = req.body.meat;
		foundTaco.toppings = req.body.toppings;
		foundTaco.recipe = req.body.recipe;
		foundTaco.picture = req.body.picture;
		console.log(foundTaco);
		foundTaco.save((err, taco) => {
			if(err){
				console.log('Update taco save error: ', err);
			}
			console.lop(taco);
			console.log('Updated taco ', taco.name);
			res.json(taco);
		});
	});
});

// DELETE
app.delete('/api/tacos/:id', (req, res) => {
	db.Taco.findOneAndRemove({ _id: req.params.id }, (err, deletedTaco) => {
		if(err){
			console.log('Deleted Taco Error: ',err);
		}
		res.json(deletedTaco);
	});
});

// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 3000);