'use strict'
// Requre DB
const db = require('./models');

// Taco Seed
let tacoList = [
{
	name: "Beef Taco Boats",
	shell: "Hard",
	meat: "Beef",
	toppings: "Rice, Beans, Cheese, Avocado, Guac, Pico, Sour Cream, Shredded Lettuce",
	recipe: "http://www.delish.com/cooking/recipe-ideas/recipes/a53019/beef-taco-boats-recipe/",
	picture: "http://www.delish.com/cooking/recipe-ideas/recipes/a53019/beef-taco-boats-recipe/?zoomable"
},
{
	name: "Jamaican Jerk Steak Tacos",
	shell: "Soft",
	meat: "Steak",
	toppings: "Pineapple, Onion, Cilantro, Avocado, Cotija Cheese",
	recipe: "http://www.delish.com/cooking/recipe-ideas/recipes/a52048/jamaican-jerk-steak-tacos-recipe/",
	picture: "http://www.delish.com/cooking/recipe-ideas/recipes/a52048/jamaican-jerk-steak-tacos-recipe/?zoomable"
},
{
	name: "Cheesy Chicken Tacos",
	shell: "Hard",
	meat: "Chicken",
	toppings: "Beans, Salsa, Pepperjack Cheese, Cilantro",
	recipe: "http://www.delish.com/cooking/recipe-ideas/recipes/a50265/cheesy-baked-tacos-recipe/",
	picture: "http://www.delish.com/cooking/recipe-ideas/recipes/a50265/cheesy-baked-tacos-recipe/?zoomable"
},
{
	name: "Sriracha Shrimp Tacos",
	shell: "Soft",
	meat: "Shrimp",
	toppings: "Purple Cabbage, Cilantro, Sour Cream, Lime",
	recipe: "http://www.delish.com/cooking/recipe-ideas/recipes/a49994/sriracha-shrimp-tacos-recipe/",
	picture: "http://www.delish.com/cooking/recipe-ideas/recipes/a49994/sriracha-shrimp-tacos-recipe/?zoomable"
}
];

db.Taco.remove({}, (err,tacos)=>{
	console.log("removed all tacos");
	db.Taco.create(tacoList,(err, tacos)=>{
		if(err){
			console.log("DB creation err: ", err);
		}
		console.log("Created Tacos!");
		process.exit();
	});
});