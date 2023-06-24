const express = require('express');
const app = express();
const port = 8000;
const bodyParser = require('body-parser');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const csv = require('csv-parser');

app.use(expressLayouts);
// extract style and scripts from sub pages into the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(express.static('assets'));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', require('./routes/home'));

app.listen(port, function (err) {
    if (err) {
        console.log("err in starting the server");
    }
    console.log('server running on port', port);
})