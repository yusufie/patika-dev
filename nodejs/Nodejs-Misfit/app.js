const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const methodOverride = require('method-override');
const fileUpload = require('express-fileupload');

const app = express();

const pageRoute = require('./routes/pageRoute');
const programRoute = require('./routes/programRoute');
const categoryRoute = require('./routes/categoryRoute'); 
const userRoute = require('./routes/userRoute');
const proficiencyRoute = require('./routes/proficiencyRoute');
const Proficiency = require('./models/Proficiency');


const mongoUrl = 'mongodb://127.0.0.1:27017/misfit';

// Global Variable
global.userIn = null;

// TEMPLATE ENGINE
app.set('view engine', 'ejs');

// MIDDLEWARES
app.use(express.static('public'));
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true})); // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'my_keyboard_cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: mongoUrl
    })
}));
app.use(fileUpload());
app.use('*', (req, res, next) => {
    userIn = req.session.userID;
    next();
});
app.use(methodOverride('_method', {
    methods: ['GET', 'POST']
}));

// ROUTES

app.use('/', pageRoute);
app.use('/programs', programRoute);
app.use('/categories', categoryRoute);
app.use('/users', userRoute);
app.use('/proficiency', proficiencyRoute);


const PORT = process.env.PORT || 3001;

app.listen(PORT, async () => {
    console.log(`Server is started on port: ${PORT} and connecting to Mongo DB...`);
    try {
        // Conenct DB
    await mongoose.connect(mongoUrl,{ 
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    let defaultProficiency = await Proficiency.findOne({slug: 'regular'});
    if(!defaultProficiency) {
        defaultProficiency = await Proficiency.create({name: 'Regular'});
    }
    console.log(`Default trainer proficiency: ${defaultProficiency.name}`);
    console.log('DB Connected Successfully!')
    } catch (err) {
        console.error(err.message)
    }
});