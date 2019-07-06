const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// User model
const UserModel = require('../models/userModel');


//Get all users
router.get('/', async (req, res) => {
    const users = await UserModel.find()
    res.json(users);
})

//Add new user
router.post('/', async (req, res) => {
    const user = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.lastName,
        department: req.body.department,
        sector: req.body.sector,
        mobileNumber: req.body.mobileNumber,
        birthday: Date.now(),
        password: req.body.password,
        createdAt: Date.now()
    });
    await user.save()
        .then(() =>
            res.json({
                message: 'User saved'
            })
        )
        .catch((err) => {
            res.json({
                err: err
            })  
            console.error(err)          
        })
})

//Update user
router.put('/:id', async (req,res) => {
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