const methodOverride = require('method-override');
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

//Load routes

const task = require('./router/task');
const user = require('./router/user');

mongoose.connect('mongodb://localhost/task-manager').then(() => {
    console.log('Mongo db connected');
}).catch((err) => {
    console.log(err);
});


//Handlebar
app.engine('handlebars', exphbs({ defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));


app.use(flash());

//Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));


//Task Index Page
app.get('/', (req, res) => {
    const title = 'Welcome';
    res.render('index', {title});
});

//About Page
app.get('/about', (req, res) => {
    res.render('about');
});

//Use Routes
app.use('/task', task);
app.use('/user', user);

//PORT
const port = 3000;

//listen server
app.listen(port, () => {
    console.log(`up on port ${port}`);
});
