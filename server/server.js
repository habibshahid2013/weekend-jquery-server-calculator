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

app.post('/inputsButton', (req, res) =>{
    console.log('Still waiting on GET', req.body);
    // newReqBody.num1Input = req.body.num1Input;
    // newReqBody.num2Input = req.body.num1Input;
    // button = req.body.button;
    // logicNeeded();
    let newReqBody = req.body; 
    
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
    
    res.send(mathInput);

});



// function logicNeeded(){
//     if (button == "addBtn"){
//         let sum = Number(newReqBody.num1Input) + Number(newReqBody.num2Input);
//         mathInput.push(sum)
//         return sum
//     }
//     else if (button == "subtractBtn") {
//         let sum = Number(newReqBody.num1Input) - Number(newReqBody.num2Input);
//         mathInput.push(sum)
//         return sum
//     }
//     else if (button == "multiplyBtn") {
//         let sum = Number(newReqBody.num1Input) * Number(newReqBody.num2Input);
//         mathInput.push(sum)
//         return sum
//     }
//     else if (button == "divideBtn") {
//         let sum = Number(newReqBody.num1Input) / Number(newReqBody.num2Input);
//         mathInput.push(sum)
//         return sum
//     }
// }

const port = 5000;
app.listen(port, function(){
    console.log('Calculator app is up and running 📲');
    
});