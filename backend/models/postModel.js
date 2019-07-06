const mongoose = require('mongoose');
const { Schema } = mongoose;

const PostSchema = new Schema({
    id: mongoose.Schema.Types.ObjectId,
    title: {type: String, required: true},
    description: String,
    likes: Number,
    createdAd: Date,
    urlImg: String,
    titleImg: String,
    createdBy: mongoose.Schema.Types.ObjectId
})

module.exports = mongoose.model('Post', PostSchema)