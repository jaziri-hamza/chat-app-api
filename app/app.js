const express = require('express');
const app = express();

const http = require('http').createServer(app);
const mongo = require('mongoose');
const bodyParser = require('body-parser');

const userModel = require('./models/user.model');

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

// SOCKET IO
io.on('connection', socket =>{
        
    socket.on('auth', tokenData=>{
        userModel.findOneAndUpdate({_id: tokenData.id}, { socketID: socket.id }).exec();
    });


    socket.on('push-msg', data=>{
                
        getUserSocketId(data, socket);
        
    });

    

    socket.on('unauth', tokenData=>{
        userModel.findOneAndUpdate({_id: tokenData.id}, { socketID: ''}).exec();
    });


});


async function getUserSocketId(data, socket){
    console.log("data");
    console.log(data);
    console.log("enddata");
    const sendToSocketid = await userModel.findOne({_id: data.user.sendToId}).select("socketID").then(res=>{
        return res.socketID
    }).catch(eer=>{
        console.log(eer);
        return null;
    });
    console.log("socketid"+ socket.id);
    console.log(data.user.sendById);
    const body =  await userModel.findOne({_id: data.user.sendById}).select("_id firstName lastName").then(res=>{
        return {
            msg : [
                {
                    body: data.msg.body,
                    createdAt: data.msg.createdAt,
                    _id: {
                        _id: res._id,
                        firstName: res.firstName,
                        lastName: res.lastName
                    }
                }
            ],
            users: [
                {
                    _id: res._id,
                    firstName: res.firstName,
                    lastName: res.lastName
                }
            ]
        };
    }).catch(err=>{
        console.log(err);
        return null;
    });
    console.log(sendToSocketid);
    socket.to(sendToSocketid).emit('pull-msg', body);
    console.log(socket.id);
}



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