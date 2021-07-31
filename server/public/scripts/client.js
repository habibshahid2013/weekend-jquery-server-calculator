$(document).ready(onReady);
let clickedButton = "";
let firstInput = 0 ;
let secondInput = 0 ;

function onReady(){
    console.log('So Ready 🥙');
    
    $('#addBtn').on('click', reassignmen)
    $('#subtractBtn').on('click', totalBtn)
    $('#multiplyBtn').on('click', totalBtn)
    $('#clearBtn').on('click', totalBtn)
    $('#totalBtn').on('click', totalBtn)
}