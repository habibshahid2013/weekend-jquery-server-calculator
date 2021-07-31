console.log('Testing that my server express is working 💫');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

//static assets
app.use(express.static('./server/public'));

//set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = 5000;
app.listen(port, function(){
    console.log('Calculator app is up and running 📲');
    
});