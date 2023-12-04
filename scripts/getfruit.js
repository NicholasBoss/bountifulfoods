const fruitURL = `data/fruit.json`;

const datalist = document.getElementById('fruitlist');
const datalist2 = document.getElementById('fruitlist2');
const datalist3 = document.getElementById('fruitlist3');


function displayFruits(fruits){
    // console.log(fruits)
    fruits.forEach((fruit) => {
        // console.log(fruit.name)
        let option = document.createElement('option')
        let optionHTML = `<option class="choose-option" value="${fruit.name}">${fruit.name}</option>`
        option.innerHTML = optionHTML;
        // add list of options to each fruitlist class in the form
        datalist.appendChild(option);
        datalist2.appendChild(option.cloneNode(true));
        datalist3.appendChild(option.cloneNode(true));
    });
}



async function getFruitData(){
    const response = await fetch(fruitURL);
    if (response.ok){
        const data = await response.json();
        displayFruits(data)
    }
    else{
        console.error("Uh Oh! Something went wrong!")
        const cards = document.querySelector('#cards');
        cards.innerHTML = "<h3>Uh Oh! Something went wrong! There was an error loading the data</h3>"
    }
}

getFruitData();