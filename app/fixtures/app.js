const mongo = require('mongoose');


/** Connect to DB  */
mongo.connect('mongodb://mongodb/chat-app', {useNewUrlParser: true, useFindAndModify: true}).then(
    () => { console.log("connected to database"); },
    error => { console.log("failled connect to database" + error); }
);


/** Creat users  */
const userModel = require('../models/user.model');
let objs = [];
for(let i=0; i<10; i++){
    obj = new userModel({
        username: 'username'+i,
        email: 'email'+i+'@email.com',
        password: 'password'+i,
        firstName: 'firstName'+i,
        lastName: 'lastName'+i,
        birthday: '01/28/1994',
        sex: i%2==0,
        country: 'tunisia'+i,
        town: 'town'+i
    });
    objs.push(obj);
}





userModel.insertMany(objs).then( res => {
    console.log('user fixtures created');
    /**  Add some user to favorites  */ 
    userModel.find({}).then( res => {
        console.log('get users');
        res.forEach(element => {
            console.log('____'); console.log(element);
            let randNumber  = Math.floor(Math.random() *10 );
            userModel.update({ _id: element._id },{ $push: { favorite: res[randNumber]._id} }).then( resFav => {
                console.log('fav 1 added');
            }).catch( errFav => {
                console.log('error fav' + errFav);
            });
        });

    }).catch(err=>{
        console.log('error when try to  get user list');
    });
}).catch( err => {
    console.log('error on create user fixtures' + err);
});
