//VARIABLES
var searchBtn = document.querySelector('.searchBtn');
/* var myKey = c89a29a2eb4fd0383a0dac22a0a8e52c";
var city = document.getElementsByClassName(“userInput”);
var requestUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myKey}`; */
function fetchApi() {
  var myKey = "c89a29a2eb4fd0383a0dac22a0a8e52c";
  var city = document.querySelector('.userInput');
  var userInput = city.value;
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${userInput}&appid=${myKey}`;
  fetch(requestUrl)
    .then(function (response) {
      var data = response.json();
      return data;
    })
    .then(function (data) {
      localStorage.setItem(userInput, JSON.stringify(data));
    });
}
/* function getLocal() {
  var retrieve = localStorage.getItem(userInput);
  if (retrieve === null) {
    return [];
  }
  return JSON.parse(retrieve);
} */
//EVENT LISTENERS
document
  .querySelector('.searchBtn')
  .addEventListener('click', function (event) {
    /*     var citySearch = city.value;
    var previousSearches = getLocal();
    previousSearches.push(citySearch);
    localStorage.setItem(“Cities-Searched”, JSON.stringify(previousSearches));
    fetchApi(requestUrl); */
    fetchApi();
  });