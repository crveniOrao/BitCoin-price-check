var btn = document.getElementById("btnGetPrice");
var output = document.getElementById("actuallPrice");
var updateTime = document.getElementById("updateTime");
var $currency = $(".dropdown-item");
var currencySign = "€";
var curr = "EUR";

btn.addEventListener("click", updateValue);

window.addEventListener("load", updateValue);

$currency.click(updateCurrency);

function updateCurrency(e){
    curr = e.target.title;
    updateValue();
}


function updateValue(){
    var XHR = new XMLHttpRequest();
    XHR.onreadystatechange = function() {

        if(XHR.readyState === 4 && XHR.status === 200) {
            var data = JSON.parse(XHR.responseText);
            var rate = data.bpi[curr].rate.slice(0, -2);
            currencySign = data.bpi[curr].symbol;

            output.innerHTML = currencySign + rate;
            updateTime.innerHTML = data.time.updated;
        }
    }
    XHR.open("GET", "https://api.coindesk.com/v1/bpi/currentprice.json");
    XHR.send();
}