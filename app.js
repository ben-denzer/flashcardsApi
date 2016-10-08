let express = require('express');
let app = express();
let port = process.env.PORT || 3000;
let dbinfo = require('./.dbinfo');
let mysql = require('mysql');
let connection = mysql.createConnection(dbinfo);

let authRouter = require('./src/routes/authRouter')(connection);
app.use('/flashcards/auth', authRouter);

app.listen(port, (err) => {
    if (err) console.error(err);
    console.log('listening on ', port);
});