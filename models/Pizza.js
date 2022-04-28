//dependencies 
const { Schema, model } = require('mongoose');

//schema. data for the the users when they create a new pizza
//The name of the pizza
// the name of the user that created the pizza
// a timestamp of when the pizza was created
// a timestamp of any updates to the pizzas data
// the pizzas suggested size
// the pizzas toppings

const PizzaSchema = new Schema({
    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: []
});



//create the pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);


//export the Pizza model
module.exports = Pizza;