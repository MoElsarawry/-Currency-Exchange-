var button = document.getElementById("convertBtn");
var currencyFrom = document.getElementById("currencyFrom");
var currencyTo = document.getElementById("currencyTo");
var amount = document.getElementById("amount");
var result = document.getElementById("result");
var error = document.getElementById("error");

function displayCurrency() {
  var currencies = "";

  for (var code in COUNTRY_NAMES) {
    currencies += `
      <option value="${code}">
        ${code} - ${COUNTRY_NAMES[code]}
      </option>
    `;
  }

  currencyFrom.innerHTML = currencies;
  currencyTo.innerHTML = currencies;

  currencyFrom.value = "USD";
  currencyTo.value = "EGP";
}

button.addEventListener("click", async function () {

  if (amount.value == "") {
    error.innerHTML = "Please enter an amount";
    result.innerHTML = "";
    return;
  }

  error.innerHTML = "";

  try {
    var url = `https://v6.exchangerate-api.com/v6/https://www.exchangerate-api.com/pair/${currencyFrom.value}/${currencyTo.value}/${amount.value}`;

    var response = await fetch(url);
    var data = await response.json();

    if (data.result == "success") {
      result.innerHTML = `
        ${amount.value} ${currencyFrom.value} =
        ${data.conversion_result} ${currencyTo.value}
      `;
    } else {
      error.innerHTML = "Something went wrong";
      result.innerHTML = "";
    }

  } catch (error) {
    console.log(error);
    result.innerHTML = "";
    error.innerHTML = "Something went wrong";
  }
});

displayCurrency();