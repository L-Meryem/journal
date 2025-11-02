const connectToMongo = require('./config/db');
connectToMongo();
const express = require('express');
const app = express();

//1
const session = require('express-session');// I need it to link stuff to connected user
// can access req.sessions.userId from any route
app.use(session({
    secret: 'cH]mH-)7Tvh^487', // session secret
    resave: true,
    saveUninitialized: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use('/auth', require('./app/auth'));
app.use('/', require('./app/routes'));

const PORT = 8080;
app.listen(PORT, ()=>console.log(`Server listening on ${PORT}`));