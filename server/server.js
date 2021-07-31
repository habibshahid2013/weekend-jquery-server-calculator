console.log('Testing that my server express is working 💫');

const express = require('express');

const app = express();

//static assets
app.use(express.static('./server/public'));

const port = 5000;
app.listen(port, function(){
    console.log('Calculator app is up and running 📲');
    
});