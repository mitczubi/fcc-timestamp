const express = require('express');
const cors = require('cors');

var app = express();
const port = process.env.PORT || 3000

app.use(function (req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
})

app.use(cors())

app.get('/', function(req, res) {
    res.send("Hello World");
})

app.get('/api/:date?', function(req, res) {
    let date_string = req.params.date;
    let date;

    if (!date_string) {
        date = new Date()
    } else {
        if (!isNaN(date_string)) {
            date = new Date(parseInt(date_string))
        } else {
            date = new Date(date_string)
        }
    }

    if (date.toString() === 'Invalid Date') {
        res.json({
            error: date.toString()
        });
    } else {
        res.json({
            unix: date.valueOf(),
            utc: date.toUTCString()
        });
    }
})

app.listen(port, function() {
    console.log("Server running. Listening on port %d", port)
})