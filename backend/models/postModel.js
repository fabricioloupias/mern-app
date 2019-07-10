const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: String,
    likes: Number,
    createdAt: Date,
    urlImg: String,
    titleImg: String,
    createdBy: String,
    userId: mongoose.Schema.ObjectId,
    userUrlImg: String,
})

module.exports = mongoose.model('Post', PostSchema)