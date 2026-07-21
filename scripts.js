const convertbutton =document.querySelector(".convert-button");

function convertvalues() {
   const currencyinputvalue = document.querySelector(".currency-input").value;
   const currencyvaluetoconvert = document.querySelector(".currency-value-to-convert");
   const currencyvalueconvert = document.querySelector(".currency-value");
   const dolartoday = 5.2;

   const convertedvalue = currencyinputvalue / dolartoday;
   console.log(convertedvalue);
}

convertbutton.addEventListener("click", convertvalues)