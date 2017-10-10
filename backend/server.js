const bodyParser = require('body-parser'),
express = require('express'),
// mongooseConnection = require('./db/dbConnect').connection,
// MongoStore = require('connect-mongo')(session),
path = require('path'),
// mongoose = require('mongoose'),
apiResponse = require('express-api-response'),
port = 3030;

let app = express();

// context.mongoStore = new MongoStore({
//     mongooseConnection: mongooseConnection
// });

console.log(`app runs on port: ${port}`);
console.log(`NODE_ENV: ${process.env.NODE_ENV}`);
const server = app.listen(port);

module.exports = app;
