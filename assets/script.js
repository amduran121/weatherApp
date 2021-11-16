var input = document.getElementById("value");
var button = document.getElementById("searchBtn");

function getSearchValue() {
  var value = input.value;
  console.log(value);
  searchWeather(value);
}



function searchWeather(value) {
//create a variable endpoint to the weather map API, that will also need to dynamically enter search value into it. i'll need towrite a fetch call the variable endpoint. "".thens" two of them and after the second one is when you dynamically create the elements. it will create cards to displya what infomration comes back from the API. once created, they wil need to be appended to an existing element in the html.
}

button.addEventListener("click", getSearchValue);