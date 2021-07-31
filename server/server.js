console.log('Testing that my server express is working 💫');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const mathInput = require('./module/mathInput');

let firstInput = 0; 
let secondInput = 0; 
let button = "";


//static assets
app.use(express.static('./server/public'));

//set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/inputsButton', (req, res) =>{
    console.log('Still waiting on GET');
    firstInput = req.body.num1Input;
    secondInput = req.body.num1Input;
    button = req.body.button;
    console.log(logicNeeded());
    res.sendStatus(200)
});

app.get('/mathresults', (req, res) =>{
    res.send(mathInput);
});



function logicNeeded(){
    if (button == "addBtn"){
        let sum = Number(firstInput) + Number(secondInput);
        mathInput.push(sum)
        return sum
    }
    else if (button == "subtractBtn") {
        let sum = Number(firstInput) - Number(secondInput);
        mathInput.push(sum)
        return sum
    }
    else if (button == "multiplyBtn") {
        let sum = Number(firstInput) * Number(secondInput);
        mathInput.push(sum)
        return sum
    }
    else if (button == "divideBtn") {
        let sum = Number(firstInput) / Number(secondInput);
        mathInput.push(sum)
        return sum
    }
}

const port = 5000;
app.listen(port, function(){
    console.log('Calculator app is up and running 📲');
    
});