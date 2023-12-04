// When the form is submitted, increment the order count by 1
// assign this value to a localstorage variable
const ORDER_KEY = 'orderCount';

const form = document.querySelector('#order-form');

function setOrderAmt(){
    let currentValue = localStorage.getItem(ORDER_KEY);
    let orderCount = 1;
    
    if (currentValue != null){
        orderCount = parseInt(currentValue) + 1;
    }

    localStorage.setItem(ORDER_KEY, `${orderCount}`);
}

form.addEventListener('submit', setOrderAmt);