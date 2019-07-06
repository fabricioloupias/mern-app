const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    id: mongoose.Types.ObjectId,
    name: String,
    lastName: String,
    email: String,
    department: {type: String},
    sector: {type: String},
    mobileNumber: {type: String},
    birthday: {type: Date},
    password: {type: String},
    createdAt: Date
})

module.exports = mongoose.model('User', UserSchema);