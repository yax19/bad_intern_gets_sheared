const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js')
const authController = require('./controllers/auth.js');
const path = require('path');
const runSeeder = require('./seeder')
const breedRouter = require('./controllers/breeds.js')
const sheepRouter = require('./controllers/sheep.js')


const port = process.env.PORT ? process.env.PORT : '3000';


const app = express();

// Set the public folder to store CSS and images
app.use(express.static(path.join(__dirname, 'public')));


mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});


// Run data seeder
runSeeder();


app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));

app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passUserToView); // use new passUserToView middleware here


app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
    title: "Home"
  });
});



app.use('/auth', authController);
app.use(isSignedIn);
app.use('/breed/',breedRouter);
app.use('/sheep/',sheepRouter);



app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
