$(document).ready(onReady);
let clickedButton = "";
let firstInput = 0 ;
let secondInput = 0 ;

function onReady(){
    console.log('So Ready 🥙');

    $('#addBtn').on('click', reassignBtn)
    $('#subtractBtn').on('click', reassignBtn)
    $('#multiplyBtn').on('click', reassignBtn)
    $('#divideBtn').on('click', reassignBtn)
    $('#clearBtn').on('click', reassignBtn)
    $('#totalBtn').on('click', totalAssign)
}

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
const tempArray = []

console.log('what the button var at', clickedButton);

function totalAssign(){
    firstInput = $('#num1Input').val();
    secondInput = $('#num2Input').val();

    let inputObject = {
        num1Input: firstInput,
        num2Input: secondInput,
        button: clickedButton
    }
    tempArray.push(inputObject)
    console.log(tempArray);

$.ajax({
    method: 'POST',
    url:'/inputsButton',
    data: inputObject,
}).then((response) => {
    console.log('POST /inputsButtons', response);

}).catch(error => {
    console.log('POSt /inputsButton', error);
    $('body').append(`
    <h2>
    the numbers added aren't correct! review your inputs!
    <h2>
    `  
    );    
});

function getResults(){
    $.ajax({
        method: 'GET'
        url: '/getresults'
    }).then((response) => {
        console.log('GET /getresults response', response);
        let resultsSum = $('#resultsSum');

        //

    })
}
//console.log(inputObject);

}