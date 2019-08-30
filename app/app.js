const express = require('express');

const app = express();



app.get('/', (req, res)=>{
    res.send('test');
    res.end();
});

app.listen(3000, ()=>{ console.log('server listen at port 3000')});