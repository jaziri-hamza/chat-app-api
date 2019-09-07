const express = require('express');
const app = express();

const http = require('http').createServer(app);
const mongo = require('mongoose');
const bodyParser = require('body-parser');

const guardSocket = require('./guard/guard-socket');

const io = require('socket.io')(http);

/**
 * object {
 *  _id: idofuser,
 * socketID: socketid of user
 * }
 */



/** CONNECT TO DB AND CHECK THE CONNECTION */
mongo.connect('mongodb://mongodb/chat-app', {useNewUrlParser: true, useFindAndModify: true}).then(
    () => { console.log("connected to database"); },
    error => { console.log("failled connect to database"); }
);




/** INITIALISATION BODY-PARSER */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));



/** ALLOW CORS  */
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method == "OPTIONS"){
        res.header('Access-Control-Allow-Methods', 'PUT, POST, DELETE, GET');
        return res.status(200).json();
    }
    next();
});

// problem at this shiiiit

app.use(guardSocket, (req, res, next)=>{
    if(req.socketData == null) next();
    io.on('connection', socket =>{
        
        console.log(socket.id);
        console.log(req.currentUser.id);
        
    
    
    });
    next();
 })

/** IMPOPRT ROUTERS */
const authentificateRoute = require('./routes/authenticate.route');
const userRoute = require('./routes/user.route');
const messageRoute = require('./routes/message.route');
const favoriteRoute = require('./routes/favorite.route');

app.use('/auth', authentificateRoute);
app.use('/users', userRoute);
app.use('/messages', messageRoute);
app.use('/favorites', favoriteRoute);


http.listen(3000, ()=>{ console.log('server listen at port 3000')});