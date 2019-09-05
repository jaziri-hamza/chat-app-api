const express = require('express');
const app = express();

const mongo = require('mongoose');
const bodyParser = require('body-parser');


/** CONNECT TO DB AND CHECK THE CONNECTION */
mongo.connect('mongodb://mongodb/chat-app', {useNewUrlParser: true, useFindAndModify: true}).then(
    () => { console.log("connected to database"); },
    error => { console.log("failled connect to database"); }
);


/** ALLOW CORS  */
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Orogin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method == "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json();
    }
})

/** INITIALISATION BODY-PARSER */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/** IMPOPRT ROUTERS */
const authentificateRoute = require('./routes/authenticate.route');
const userRoute = require('./routes/user.route');
const messageRoute = require('./routes/message.route');
const favoriteRoute = require('./routes/favorite.route');

app.use('/auth', authentificateRoute);
app.use('/users', userRoute);
app.use('/messages', messageRoute);
app.use('/favorites', favoriteRoute);


app.listen(3000, ()=>{ console.log('server listen at port 3000')});