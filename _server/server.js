var app, bodyParser, cors, express, hbs, path, port;

cors = require("cors");
express = require("express");
hbs = require("hbs");
path = require("path");
bodyParser = require('body-parser');
port = 9000;
app = express();
app.use(cors());

app.set('views', __dirname + '/../');
app.set('view engine', 'html');
app.engine('html', hbs.__express);

app.use(express["static"](path.join(__dirname, 'mockdata')));
app.use(express["static"](path.join(__dirname, 'locale')));
app.use(express["static"](path.join(__dirname, '../')));
app.use(express["static"](path.join(__dirname, '../client/src')));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes')(app, port);

app.listen(port);

console.log("Server listening on port " + port);