const express = require('express');

const app = express();


/** IMPOPRT ROUTERS */
const userRoute = require('./routes/user.route');



app.use('/users', userRoute);

app.listen(3000, ()=>{ console.log('server listen at port 3000')});