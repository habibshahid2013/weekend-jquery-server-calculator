console.log('Testing that my server express is working 💫');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

let mathInput = []
//needs to be a global variable
let history = []

//static assets
app.use(express.static('./server/public'));

//set up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//the AJax function pulls the object and puts it in a function 'res.body'
app.post('/inputsButton', (req, res) =>{
    console.log('req is', req.body);
    //req.body is then placed into a variable newReqBody
    let newReqBody = req.body; 
    
    let sum = 0 
    //the object can be access within the variable
    //if statement are created to create the logic needed.
    //then the logic are put into an array.
    if (newReqBody.button == "addBtn") {
        sum = Number(newReqBody.num1Input) + Number(newReqBody.num2Input);
        mathInput = []
        mathInput.push(sum)
        
    }
    else if (newReqBody.button == "subtractBtn") {
        sum = Number(newReqBody.num1Input) - Number(newReqBody.num2Input);
        mathInput = []
        mathInput.push(sum)
        
    }
    else if (newReqBody.button == "multiplyBtn") {
        sum = Number(newReqBody.num1Input) * Number(newReqBody.num2Input);
        mathInput = []
        mathInput.push(sum)
      
    }
    else if (newReqBody.button == "divideBtn") {
        sum = Number(newReqBody.num1Input) / Number(newReqBody.num2Input);
        mathInput = []
        mathInput.push(sum)
    }
    //Taking logic and putting it into a function to be sent into a GET
    let fullSolve = {
        sum: sum, 
        num1: newReqBody.num1Input,
        num2: newReqBody.num2Input,
        numBtn: newReqBody.button
    }
    //after setting up fullSolve we push it into the history array.
    history.push(fullSolve);
    console.log('testing full solve', history);
    
    res.sendStatus(200)
});
//here we set up a GET endpoint which will send the fullSolve into history 
//which gets sent to the other GET endpoint aka getHistory()
app.get('/mathhistory', (req, res) => {
   console.log('history path', req.body.path);
   
    res.send(history);
});

//sending MathInputs to the GET function on the client side. 
app.get('/mathresults', (req, res) =>{
    console.log('see the path', req.route.path);
    
    
    //it's being sent here. 
    res.send(mathInput);

});

const port = 5000;
app.listen(port, function(){
    console.log('Calculator app is up and running 📲');
    
});