//Import the models we need 'Comment and Pizza' 
const { Comment, Pizza } = require('../models');
//create commentController object. Then create two methods for adding and removing comments 
const commentController = {
    //add comment to pizza
    addComment({ params, body}, res) {
        console.log(body);
        Comment.create(body)
        .then(({ _id }) => {
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                { $push: { comments: _id } },           //Note here that were using the $push mehtod to add the comments _id to the specific pizza we want to update.$push method adds data to an array
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if(!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));
    },

    //remove comment
    removeComment({ params }, res) {
        Comment.findOneAndDelete({ _id: params.commentId })
        .then(deletedComment => {
            if (!deletedComment) {
                return res.status(404).json({ message: 'No comment with this id!' });
            }
            return Pizza.findOneAndUpdate(
                { _id: params.pizzaId },
                { $pull: { comments: params.commentId } },
                { new: true }
            );
        })
        .then(dbPizzaData => {
            if (!dbPizzaData) {
                res.status(404).json({ message: 'No pizza found with this id!' });
                return;
            }
            res.json(dbPizzaData);
        })
        .catch(err => res.json(err));

    }
};

//The first method we used here, .findOneAndDelete(), works alot like .findOneAndUpdate(), as it deletes the document while also returning its data.
//We then take that data and use it to identify and removie it from the associated pizza using the Mongo $pull operation. Lastly, we return the 
//updated pizza data, now without the _id of the comment in the comments array, and return it to the user.

module.exports = commentController;