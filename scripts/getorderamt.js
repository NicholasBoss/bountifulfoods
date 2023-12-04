// Grab orderCount from localstorage and assign it to the order-count element

const orderCount = localStorage.getItem('orderCount');
const orderCountElement = document.querySelector('#order-count');

if (orderCount == null){
    localStorage.setItem('orderCount', 0);
}

orderCountElement.innerHTML = orderCount;
let currentValue = localStorage.getItem(orderCount);
