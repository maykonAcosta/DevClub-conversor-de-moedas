const convertbutton = document.querySelector(".convert-button");
const currencyselect = document.querySelector(".currency-select");

// guarda as cotações do dia depois de buscar na API
const cotacoes = {
   dolar: null,
   euro: null,
   libra: null,
};

// busca as cotações reais na AwesomeAPI (gratuita, sem chave)
async function buscarCotacoes() {
   try {
      const resposta = await fetch("https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL");
      const dados = await resposta.json();

      cotacoes.dolar = parseFloat(dados.USDBRL.bid);
      cotacoes.euro = parseFloat(dados.EURBRL.bid);
      cotacoes.libratoday = parseFloat(dados.GBPBRL.bid); // valor da libra da API

      console.log("Cotações atualizadas:", cotacoes);
   } catch (erro) {
      console.error("Não foi possível buscar a cotação do dia, usando valores padrão.", erro);
      // valores de emergência caso a API esteja fora do ar
      cotacoes.dolar = 5.2;
      cotacoes.euro = 6.0;
      cotacoes.libratoday = 7.0; // valor fixo da libra, pois a API não fornece
   }
}


// escreve na tela o valor de 1 unidade da moeda escolhida em Reais
function mostrarCotacaoDoDia() {
   const cotacaoTexto = document.querySelector(".cotacao-dia");

   if (cotacoes.dolar === null || cotacoes.euro === null) {
      cotacaoTexto.innerHTML = "Buscando cotação do dia...";
      return;
   }

   const valorEmReais = currencyselect.value == "euro" ? cotacoes.euro : currencyselect.value == "libra" ? cotacoes.libratoday : cotacoes.dolar;
   const siglaMoeda = currencyselect.value == "euro" ? "EUR" : currencyselect.value == "libra" ? "GBP" : "USD";

   const valorFormatado = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
   }).format(valorEmReais);

   cotacaoTexto.innerHTML = `1 ${siglaMoeda} = ${valorFormatado}`;
}

function convertvalues() {
   const currencyinputvalue = document.querySelector(".currency-input").value;
   const currencyvaluetoconvert = document.querySelector(".currency-value-to-convert");
   const currencyvalueconverted = document.querySelector(".currency-value");

   // se a cotação ainda não chegou da API, avisa e cancela
   if (cotacoes.dolar === null || cotacoes.euro === null || cotacoes.libratoday === null) {
      alert("Aguarde, buscando a cotação do dia...");
      return;
   }

   console.log(currencyselect.value);
   const dolartoday = cotacoes.dolar;
   const eurotoday = cotacoes.euro;
   const libratoday = cotacoes.libratoday; // valor fixo da libra, pois a API não fornece
   let convertedvalue;


   currencyvaluetoconvert.innerHTML = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
   }).format(currencyinputvalue);



   if (currencyselect.value == "dolar") {
      convertedvalue = currencyinputvalue / dolartoday;
      currencyvalueconverted.innerHTML = new Intl.NumberFormat("en-US", {
         style: "currency",
         currency: "USD"
      }).format(convertedvalue);
      
   }
   if (currencyselect.value == "euro") {
      convertedvalue = currencyinputvalue / eurotoday;
      currencyvalueconverted.innerHTML = new Intl.NumberFormat("de-DE", {
         style: "currency",
         currency: "EUR"
      }).format(convertedvalue);
      
   }

   if (currencyselect.value=="libra"){
      convertedvalue = currencyinputvalue / libratoday;
      currencyvalueconverted.innerHTML = new Intl.NumberFormat("en-GB", {
         style: "currency",
         currency: "GBP"
      }).format(convertedvalue);
   }


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

   if (currencyselect.value == "libra") {
      currencyname.innerHTML = "£ Libra Esterlina";
      currencyimg.src = "./assets/libra 1.png";
   }

   convertvalues()
}


currencyselect.addEventListener("change", changecurrency)
convertbutton.addEventListener("click", convertvalues)

buscarCotacoes();
mostrarCotacaoDoDia();
console.log("Cotações iniciais:", cotacoes);