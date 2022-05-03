//dependencies 
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//schema. data for the the users when they create a new pizza
//The name of the pizza
// the name of the user that created the pizza
// a timestamp of when the pizza was created
// a timestamp of any updates to the pizzas data
// the pizzas suggested size
// the pizzas toppings

const PizzaSchema = new Schema(
    {

    pizzaName: {
        type: String
    },
    createdBy: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => dateFormat(createdAtVal)
    },
    size: {
        type: String,
        default: 'Large'
    },
    toppings: [],
    
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'                      //ref property is important because it tells the Pizza model which documents to search to find the right comments 
        }
    ]

    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//Virtuals allow you to add virtual properties to a document that arent stored in the database.
//Virtuals all us to add more information to adatabse response so that we dont have to add in the information manually
//Becuase we only care about comment count in respect to pizzas, well add the virtual to models/Pizza.js

//get total count of comments and replies on retrieval
PizzaSchema.virtual('commentCount').get(function() {
    return this.comments.length;
});



//create the pizza model using the PizzaSchema
const Pizza = model('Pizza', PizzaSchema);


//export the Pizza model
module.exports = Pizza;