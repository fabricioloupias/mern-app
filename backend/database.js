const mongoose = require('mongoose');
const url = 'mongodb://localhost/mern-app';

mongoose.connect(url, {useNewUrlParser: true })
  .then(db => console.log('Db is connected'))
  .catch(error => console.error(error));

module.exports = mongoose;