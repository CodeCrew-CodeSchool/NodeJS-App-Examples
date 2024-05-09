const express = require('express');

const app = express();

app.listen(3001, function(){
    console.log('this is an express app')
});

//starting @ 1:10 with Frontends that call the mongooseAppServer