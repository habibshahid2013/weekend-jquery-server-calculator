$(document).ready(onReady);
let clickedButton = "";
let firstInput = 0 ;
let secondInput = 0 ;
let symbolChange = "";

//onReady function pulls in the html ids using Jquery 
function onReady(){
    console.log('So Ready 🥙');
    //pulling 
    $('#addBtn').on('click', reassignBtn)
    $('#subtractBtn').on('click', reassignBtn)
    $('#multiplyBtn').on('click', reassignBtn)
    $('#divideBtn').on('click', reassignBtn)
    $('#clearBtn').on('click', reassignBtn)
    $('#totalBtn').on('click', totalAssign)
}
//the the reassign function brings in the clicked Id's buttons 
//and has it go into a variable clickedButton 
function reassignBtn(){
    if ($(this).attr('id') == "addBtn"){
        clickedButton = "addBtn";
    }
    else if ($(this).attr('id') == "subtractBtn"){
        clickedButton = "subtractBtn";
    }
    else if ($(this).attr('id') == "multiplyBtn"){
        clickedButton = "multiplyBtn";
    }
    else if ($(this).attr('id') == "divideBtn"){
        clickedButton = "divide"; 
    }

}
let tempArray = []
let inputObject = {}

console.log('what the button var at', clickedButton);

//the totalAssign function puts the inputs into an object
//preparing to send it through the server.
function totalAssign(){
    firstInput = $('#num1Input').val();
    secondInput = $('#num2Input').val();

    inputObject = {
        num1Input: firstInput,
        num2Input: secondInput,
        button: clickedButton
    }
    //capturing information to test within test array
    tempArray.push(inputObject)
    console.log(tempArray);
//we use the Ajax method to send the object through '/inputsButton' 
//into the server with response. 
$.ajax({
    method: 'POST',
    url:'/inputsButton',
    data: inputObject,
}).then((response) => {
    console.log('POST /inputsButtons', response);
    getResults();
}).catch(error => {
    console.log('POSt /inputsButton', error);
    $('body').append(`
    <h2>
    the numbers added aren't correct! review your inputs!
    <h2>
    `  
    );    
});


}

function getResults() {
    //mathInputs are sent here from the server through /mathresults
    //which become the response. A variable is created to math the id on the DOM.
    //then the text is pushed onto the DOM with the response index in interpolation
    $.ajax({
        method: 'GET',
        url: '/mathresults'
    }).then((response) => {
        console.log('GET /mathresults response', response);
       
        let sumResults = $('#resultsSum');
        sumResults.text(`${response[0]}`);
        let pastResults = $('#pastResults')
        
        //create a If statement to change the button into
        //the needed symbol to be added unto the DOM
        if (clickedButton == "addBtn") {
            symbolChange = "+";
        }
        else if (clickedButton == "subtractBtn") {
            symbolChange = "-";
        }
        else if (clickedButton == "divideBtn") {
            symbolChange = "/";
        }
        else if (clickedButton == "multiplyBtn") {
            symbolChange = "*";
        }
        pastResults.append(`
        <li> ${inputObject.num1Input} ${symbolChange} ${inputObject.num2Input} </li>
       `)

    })
}