//skeleton code to set up for express.js
const router = require('express').Router();

//Imported Controller Methods
const {
    getAllPizza,
    getPizzaById,
    createPizza,
    updatePizza,
    deletePizza,
} = require('../../controllers/pizza-controller');

//Set up GET all and POST at /api/pizzas
router
    .route('/')
    .get(getAllPizza)
    .post(createPizza);


//set up GET one, PUT, and DELETE at /api/pizzas/:id

router
    .route('/:id')
    .get(getPizzaById)
    .put(updatePizza)
    .delete(deletePizza);






module.exports = router;