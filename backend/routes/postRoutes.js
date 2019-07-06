const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Post model
const PostModel = require('../models/postModel');

//Get all post
router.get('/', async (req, res) => {
    await PostModel.find()
        .then(data => {
            if (data) {
                res.status(200).json(data);
            } else {
                res.status(400).json({
                    message: 'No posts yet'
                })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            })
        })
})

//New post
router.post('/', async (req, res) => {
    const post = new PostModel({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        description: req.body.description,
        createdAd: Date.now(),
        urlImg: req.body.urlImg,
        titleImg: req.body.titleImg,
        createdBy: req.body.createdBy
    });
    await post.save()
        .then(result => {
            res.status(200).json({
                message: 'Created post successfully',
                createdPost: {
                    titlePost: result.title,
                    _id: result._id
                }
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            })
        })
})

//Get product by id
router.get('/:postId', async (req, res) => {
    const postId = req.params.postId;
    await PostModel.findById(postId)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(400).json({
                    message: 'The post does not exist',
                })
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err,
            })
        })

})


//Update post by id
router.patch('/:postId', async (req, res) => {
    const id = req.params.postId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    await PostModel.update({ _id: id }, { $set: updateOps })
        .then(result => {
            res.status(200).json({
                message: 'Post updated'
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            })
        })
})

//Delete post by id
router.delete('/postId', async (req, res) => {
    const id = req.params.postId;
    PostModel.findByIdAndDelete(id)
        .then(result => {
            res.status(200).json({
                message: 'Post deleted'
            })
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;