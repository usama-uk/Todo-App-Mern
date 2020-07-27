const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./routes/api/users');

const app = express();

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Database Config
const db = require('./config/keys').mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    {
      // useMongoClient: true throws a deprecation warning. Use "useNewUrlParser: true" instead. See below
      useNewUrlParser: true, // gets rid of deprecation warning
      useUnifiedTopology: true // gets rid of deprecation warning
    }
  )
  .then(() => console.log('MongoDB successfully connected'))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport');

// Routes
app.use('/api/users', users);

//Serve Static assets if it is in production

if(process.env.NODE_ENV=== 'production'){
  //set static folder
  app.use(express.static('client/build'));
  app.get('*',(req,res) => {
  
    res.sendFile(path.resolve(__dirname, 'client', 'build','index.html'));
  });
  }
// process.env.port is Heroku's port, in case we need to deploy there
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});