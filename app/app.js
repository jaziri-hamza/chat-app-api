const express = require('express');
const app = express();

const mongo = require('mongoose');
const bodyParser = require('body-parser');


/** CONNECT TO DB AND CHECK THE CONNECTION */
mongo.connect('mongodb://mongodb/chat-app', {useNewUrlParser: true, useFindAndModify: true}).then(
    () => { console.log("connected to database"); },
    error => { console.log("failled connect to database"); }
);


/** INITIALISATION BODY-PARSER */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/** IMPOPRT ROUTERS */
const authentificateRoute = require('./routes/authenticate.route');
const userRoute = require('./routes/user.route');
const messageRoute = require('./routes/message.route');

app.use('/auth', authentificateRoute);
app.use('/users', userRoute);
app.use('/messages', messageRoute);


app.listen(3000, ()=>{ console.log('server listen at port 3000')});