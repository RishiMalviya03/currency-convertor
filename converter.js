const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");


for(let select of dropdowns){
for(currcode in countryList){
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if(select.name === "from" && currcode ==="USD"){
        newOption.selected = "selected";
    }
    else if(select.name === "to" && currcode ==="INR"){
        newOption.selected = "selected";
    }
    select.append(newOption);
    }
    select.addEventListener("change" ,(evt) =>{
        updateflag(evt.target);
    });
}
const updateExchangeRate = async() =>{
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    console.log(amtval);
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
    }
   // console.log(fromcurr.value,tocurr.value);
    const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}/${tocurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);   
    let data = await response.json();
    let rate = data[tocurr.value.toLowerCase()];
    console.log(rate);
    let finalAmount =  amount.value *rate;
    msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount} ${tocurr.value}`;
};
const updateflag  =(element) =>{
    let currcode = element.value;
    console.log(currcode);
    let countrycode = countryList[currcode];
    let newsrc = `https://flagsapi.com/${countrycode}/shiny/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc; 
}
btn.addEventListener("click", (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
    
}); 

window.addEventListener("load",() =>{
    updateExchangeRate();
});

