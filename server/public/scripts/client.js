$(document).ready(onReady);
let clickedButton = "";
let firstInput = 0 ;
let secondInput = 0 ;
let symbolChange = "";
let tempArray = []
let inputObject = {}

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
    getHistory();
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
        // It's important that these functions get POST to the server. 
        //before it gets appended for that it can also be on the server side in case of a client failure.
        getResults();
        getHistory();
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
        sumResults.text(`${response}`);
        
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

    })
}

//Here I added  the getHistory function which we took the history of the logic
function getHistory(){
    $.ajax({
        method: 'Get',
        url: '/mathhistory'
        }).then((response) =>{
            console.log('GET mathhistory response', response);
            //we make a variable to pull in the pastresults id from the DOM
            let pastResults = $('#pastResults');
            pastResults.empty();
            // A loop is set up here to to grab the responses
            for(let push of response){
                //This if statement is going through the response btn and changing the conversions
                if (push.numBtn == "addBtn") {
                    symbolChange = "+";
                }
                else if (push.numBtn == "subtractBtn") {
                    symbolChange = "-";
                }
                else if (push.numBtn == "divideBtn") {
                    symbolChange = "/";
                }
                else if (push.numBtn == "multiplyBtn") {
                    symbolChange = "*";
                }
                //here we append to pastresults and add the response with push that shares the object
                pastResults.append(`
        <li> ${push.num1} ${symbolChange} ${push.num2} = ${push.sum}</li>
    `)
            }
    })
}