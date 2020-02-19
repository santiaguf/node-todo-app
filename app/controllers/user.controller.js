const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    console.log(req.body);
    // Validate request
    if(!req.body.name) {
        return res.status(400).send({
            message: "User can not be empty"
        });
    }

    // Create a user
    const user = new User({
        name: req.body.name || "Unknown user"
    });

    // Save User in the database
    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user."
        });
    });
};