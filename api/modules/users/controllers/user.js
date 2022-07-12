const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getAllUsers = (req, res, next) => {
    User.find().then(users => {
        res.status(200).json({
            message: 'Users fetched successfully',
            users: users
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Fetching users failed',
            error: err
        });
    });
}
const getUserById = (req, res, next) => {
    User.findById(req.params.userId).then(user => {
        if (user) {
            res.status(200).json({
                message: 'User found',
                user: user
            });
        } else {
            res.status(404).json({
                message: 'User not found'
            });
        }
    }).catch(err => {
        res.status(500).json({
            message: 'Fetching user failed',
            error: err
        });
    });
}
const patchUserById = (req, res, next) => {
    User.update({_id: req.params.userId}, {$set: req.body}).then(result => {
        res.status(200).json({
            message: 'User updated',
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            message: 'User update failed',
            error: err
        });
    });
}
const deleteUserById = (req, res, next) => {
    User.remove({_id: req.params.userId}).then(result => {
        res.status(200).json({
            message: 'User deleted'
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Deleting user failed',
            error: err
        });
    });
}
const signupUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                message: 'Creating a user failed',
                error: err
            });
        } else {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save().then(createdUser => {
                createdUser.password = '******';
                res.status(201).json({
                    message: 'User added successfully',
                    createdUser: createdUser
                });
            }).catch(err => {
                res.status(500).json({
                    message: 'Creating a user failed',
                    error: err
                });
            });
        }
    });
}
const loginUser = (req, res, next) => {
    User.find({ email: req.body.email }).then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Auth failed'
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err, result) => {
            if (err) {
                return res.status(401).json({
                    message: 'Auth failed',
                    error: err
                });
            }
            if (result) {
                const token = jwt.sign({
                        email: user[0].email,
                        id: user[0]._id
                    }, process.env.JWT_KEY,
                    {  expiresIn: '1h' }
                );
                return res.status(200).json({
                    message: 'Auth successful',
                    token: token
                });
            }
            res.status(401).json({
                message: 'Auth failed'
            });
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Fetching users failed',
            error: err
        });
    });
}

module.exports = {
    getAllUsers,
    getUserById,
    patchUserById,
    deleteUserById,
    signupUser,
    loginUser
};