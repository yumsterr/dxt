const bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    express = require('express'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    mongooseConnection = require('./db').connection,
    MongoStore = require('connect-mongo')(session),
    path = require('path'),
    passport = require('passport'),
    apiResponse = require('express-api-response'),
    config = require('./config'),
    port = 3030;

let app = express();

const store = new MongoStore({
    mongooseConnection: mongooseConnection
});

app.use(session({
    secret: config.session.secret,
    resave: true,
    saveUninitialized: true,
    store: store
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/dist', express.static(path.resolve(__dirname + '/../dist')));

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

require('./routes/api/routes')(app);
require('./routes/view/routes')(app);

console.log(`app runs on port: ${port}`);
const server = app.listen(port);

module.exports = app;
