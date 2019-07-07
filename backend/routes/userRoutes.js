const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');

// User model
const UserModel = require('../models/userModel');


// @route   Get api/users
// @desc    Get all users
// @access  Public
router.get('/', async (req, res) => {
    const users = await UserModel.find()
    res.json(users);
})

// @route   POST api/users
// @desc    Register new user
// @access  Public
router.post('/', async (req, res) => {
    const newUser = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        department: req.body.department,
        sector: req.body.sector,
        mobileNumber: req.body.mobileNumber,
        birthday: Date.now(),
        password: req.body.password,
        createdAt: Date.now()
    });
    if (!isValidUser(newUser)) {
        return res.status(400).json({
            message: 'Please enter all fields'
        });
    } else {
        await UserModel.find({ email: newUser.email })
            .then(user => {
                console.log(user.length)
                if (user.length <= 0) {
                    // Create salt & hash
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) {
                                return res.status(400).json({ err: err });
                            } else {
                                newUser.password = hash;
                                newUser.save()
                                    .then(u => {
                                        jwt.sign(
                                            { id: u.id },
                                            config.get('jwtSecret'),
                                            { expiresIn: 3600 },
                                            (err, token) => {
                                                if (err) {
                                                    return res.status(400).json({ err: err });
                                                } else {
                                                    res.json({
                                                        token,
                                                        user: {
                                                            _id: u._id,
                                                            name: u.name,
                                                            email: u.email
                                                        }
                                                    });
                                                }
                                            }
                                        )
                                    });
                            }

                        })
                    })
                } else {
                    return res.status(400).json({ message: 'User already exists' });
                }
            })
            .catch(err => {
                res.json({
                    message: err
                })
            });
    }
})

// @route   POST api/users/:id
// @desc    Update user
// @access  Public
router.put('/:id', async (req, res) => {
    const u = req.body;
    const userId = req.params.id;
    await UserModel.findByIdAndUpdate(userId, u)
        .then(() => {
            res.json({
                message: 'User successfully updated'
            })
        })
        .catch((err) => {
            res.json({
                message: 'Error user updated'
            })
            console.error(err)
        })
})

router.delete('/:id', async (req, res) => {
    const userId = req.params.id;
    await UserModel.findByIdAndDelete(userId)
        .then(() => {
            res.json({
                message: 'User successfully removed'
            })
        })
        .catch((err) => {
            res.json({
                message: 'Error user removed'
            })
            console.error(err)
        })
})



module.exports = router;

//check user is valid
function isValidUser(user) {
    var isValid = false;
    if (user.name || user.email || user.password) {
        isValid = true;
    } else {
        isValid = false;
    }
    return isValid
}