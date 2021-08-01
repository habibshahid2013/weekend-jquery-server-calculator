console.log('Testing that my server express is working 💫');

const express = require('express');

const bodyParser = require('body-parser');

const app = express();

let mathInput = []


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
    
    //the object can be access within the variable
    //if statement are created to create the logic needed.
    //then the logic are put into an array.
    if (newReqBody.button == "addBtn") {
        let sum = Number(newReqBody.num1Input) + Number(newReqBody.num2Input);
        mathInput = []
        mathInput.push(sum)
        
    }
    else if (newReqBody.button == "subtractBtn") {
        let sum = Number(newReqBody.num1Input) - Number(newReqBody.num2Input);
        mathInput = []
        mathInput.push(sum)
        
    }
    else if (newReqBody.button == "multiplyBtn") {
        let sum = Number(newReqBody.num1Input) * Number(newReqBody.num2Input);
        mathInput = []
        mathInput.push(sum)
      
    }
    else if (newReqBody.button == "divideBtn") {
        let sum = Number(newReqBody.num1Input) / Number(newReqBody.num2Input);
        mathInput = []
        mathInput.push(sum)
    }

    res.sendStatus(200)
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