const convertbutton = document.querySelector(".convert-button");
const currencyselect = document.querySelector(".currency-select");

function convertvalues() {
   const currencyinputvalue = document.querySelector(".currency-input").value;
   const currencyvaluetoconvert = document.querySelector(".currency-value-to-convert");
   const currencyvalueconverted = document.querySelector(".currency-value");

   console.log(currencyselect.value);
   const dolartoday = 5.2;
   const eurotoday = 6.0;


   if (currencyselect.value == "dolar") {
      currencyvaluetoconvert.innerHTML = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD"
      }).format(currencyinputvalue);
      convertedvalue = currencyinputvalue / dolartoday;
   }
   if (currencyselect.value == "euro") {
      currencyvaluetoconvert.innerHTML = new Intl.NumberFormat("de-DE", {
         style: "currency",
         currency: "EUR"
      }).format(currencyinputvalue);
      convertedvalue = currencyinputvalue / eurotoday;
   }

   currencyvalueconverted.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
   }).format(convertedvalue);
}
function changecurrency() {
   const currencyname = document.getElementById("currency-name");
   const currencyimg = document.querySelector(".currency-img");


   if (currencyselect.value == "dolar") {
      currencyname.innerHTML = "US$ Dólar Americano";
      currencyimg.src = "./assets/dolar americano 1.png";
   }
   if (currencyselect.value == "euro") {
      currencyname.innerHTML = "€ Euro";
      currencyimg.src = "./assets/Euro1.png";
   }

   convertvalues()
}


currencyselect.addEventListener("change", changecurrency)
convertbutton.addEventListener("click", convertvalues)