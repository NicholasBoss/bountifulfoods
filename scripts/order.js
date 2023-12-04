let url = new URL(window.location);  // use GET method to use this
let params = url.searchParams;

// for (let p of params) {
//     console.log(p);
// }

document.getElementById("fname").innerHTML = params.get('fname');
document.getElementById("email").innerHTML = params.get('email');
document.getElementById("tel").innerHTML = params.get('tel');
document.getElementById('fruit1').innerHTML = params.get('fruit1');
document.getElementById('fruit2').innerHTML = params.get('fruit2');
document.getElementById('fruit3').innerHTML = params.get('fruit3');
let date = new Date(params.get('timestamp'));
let options = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric'};
let timeoption = {hour: 'numeric', minute: 'numeric'};
document.getElementById('timestamp').innerHTML = date.toLocaleDateString('en-US', options);
date.setMinutes(date.getMinutes() + 20);
document.getElementById('time').innerHTML = date.toLocaleTimeString('en-US', timeoption);
//  if spec_instr is empty, display "None"
if (params.get('spec_instr') == ""){
    document.getElementById('spec_instr').innerHTML = 'None';
}
else{
    document.getElementById('spec_instr').innerHTML = params.get('spec_instr');
}

// get nutrional info for each fruit




function displayFruitSummary(fruits){
    // console.log(fruits)
    let selectedfruits = [];
    selectedfruits.push(params.get('fruit1'));
    selectedfruits.push(params.get('fruit2'));
    selectedfruits.push(params.get('fruit3'));
    // console.log(selectedfruits)
    const calories = []
    const fat = []
    const carbohydrates = []
    const protein = []
    const sugar = []


    selectedfruits.forEach((fruit) => { // for each fruit in the selected fruits list, get the nutrional info
        let nutrition = fruits.filter(x => x.name == fruit)


        // console.log(nutrition)
        const fruitinfo = [nutrition[0].nutritions]
        // console.log(fruitinfo)
        // sum the nutrional info for each fruit
        for (const [key, value] of Object.entries(fruitinfo[0])) {
            // console.log(`${key}: ${value}`);
            
            calories.push(fruitinfo[0].calories)
            fat.push(fruitinfo[0].fat)
            carbohydrates.push(fruitinfo[0].carbohydrates)
            protein.push(fruitinfo[0].protein)
            sugar.push(fruitinfo[0].sugar)

           
        }
        totalNutrition = fruitinfo.reduce(
            (acc, {calories, fat, carbohydrates, protein, sugar}) => ({
                calories: acc.calories + calories,
                fat: acc.fat + fat,
                carbohydrates: acc.carbohydrates + carbohydrates,
                protein: acc.protein + protein,
                sugar: acc.sugar + sugar
            }),
            {calories: 0, fat: 0, carbohydrates: 0, protein: 0, sugar: 0}
        )
        

        let fruitname = document.createElement('h3')
        fruitname.innerHTML = fruit
        document.getElementById('cards').appendChild(fruitname)
        let nutritions = document.createElement('ul')
        nutritions.innerHTML = `<li>Calories: ${totalNutrition.calories}</li><li>Fat: ${totalNutrition.fat}</li><li>Carbs: ${totalNutrition.carbohydrates}</li><li>Protein: ${totalNutrition.protein}</li><li>Sugar: ${totalNutrition.sugar}</li>`
        document.getElementById('cards').appendChild(nutritions)


    })
    const uniqueCal = [...new Set(calories)];
    const sumOfUniqueCalories = uniqueCal.reduce((total, carb) => total + carb, 0);
    const roundedCal = sumOfUniqueCalories.toFixed(0)
    // console.log(`Sum of unique calories: ${sumOfUniqueCalories}`);

    const uniqueFat = [...new Set(fat)];
    const sumOfUniqueFat = uniqueFat.reduce((total, carb) => total + carb, 0);
    // round to 2 decimal places
    const roundedFat = sumOfUniqueFat.toFixed(2)
    // console.log(`Sum of unique fat: ${roundedFat}`);

    const uniqueCarbs = [...new Set(carbohydrates)];
    const sumOfUniqueCarbs = uniqueCarbs.reduce((total, carb) => total + carb, 0);
    const roundedCarbs = sumOfUniqueCarbs.toFixed(2)
    // console.log(`Sum of unique carbs: ${sumOfUniqueCarbs}`);

    const uniqueProtein = [...new Set(protein)];
    const sumOfUniqueProtein = uniqueProtein.reduce((total, carb) => total + carb, 0);
    const roundedProtein = sumOfUniqueProtein.toFixed(2)
    // console.log(`Sum of unique protein: ${roundedProtein}`);

    const uniqueSugar = [...new Set(sugar)];
    const sumOfUniqueSugar = uniqueSugar.reduce((total, carb) => total + carb, 0);
    const roundedSugar = sumOfUniqueSugar.toFixed(2)
    // console.log(`Sum of unique sugar: ${sumOfUniqueSugar}`);

    let summaryTitle = document.createElement('h3')
    summaryTitle.innerHTML = 'Summary'
    document.getElementById('total').appendChild(summaryTitle)
    let summary = document.createElement('ul')
    summary.innerHTML = `<li>Calories: ${roundedCal}</li><li>Fat: ${roundedFat} grams</li><li>Carbs: ${roundedCarbs} grams</li><li>Protein: ${roundedProtein} grams</li><li>Sugar: ${roundedSugar} grams</li>`
    document.getElementById('total').appendChild(summary)


    

}
const fruitURL = `data/fruit.json`;
async function getFruitData(){
    const response = await fetch(fruitURL);
    if (response.ok){
        const data = await response.json();
        displayFruitSummary(data)
    }
    else{
        console.error("Uh Oh! Something went wrong!")
        const cards = document.querySelector('#cards');
        cards.innerHTML = "<h3>Uh Oh! Something went wrong! There was an error loading the data</h3>"
    }
}


getFruitData();
