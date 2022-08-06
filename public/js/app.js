console.log('Client side JS file is loaded!');

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

//messageOne.textContent = 'From JS';

weatherForm.addEventListener('submit', (event) => { //event = submit action, after page is refreshed
    event.preventDefault(); //prevent page from refreshing

    const location = search.value; //location string

    messageOne.textContent = 'Searching...';
    messageTwo.textContent = '';

    fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => {
        response.json() //parse data
        .then((data) => {
            if (data.error) {         
                messageOne.textContent = data.error;
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = data.location;
                messageTwo.textContent = data.forecast;                
            }
        })
    })
})