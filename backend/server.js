const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require('morgan');
const path = require('path');
const port = app.get('port');


// Db connection
const { moongose } = require('./database');

// Settings
app.set('port', process.env.PORT || 4000);

// Middlewares
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/posts', require('./routes/postRoutes'));

// Static files
app.use(express.static(path.join(__dirname, '../public')))

app.use(cors());
app.use(bodyParser.json());

app.listen(app.get('port'), function(){
    console.log(`Server running port: ${app.get('port')}`);
})