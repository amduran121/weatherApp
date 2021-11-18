//VARIABLES
var searchBtn = document.getElementsByClassName("searchBtn");

var myKey = "aa2cf9999a020baafc7c25b8f844ea9c"
var city = document.getElementsByClassName('userInput');
var requestUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myKey}`;



getLocal();
/* function fetchApi(city) {
  fetch(requestUrl)
    .then(function (response) {
      return response.json();
      console.log(data);
    })
    .then(function (data) {
      //api data being pulled
    });
} */
//FUNCTIONS
function cityInput(event) {
  event.preventDefault();
  var userCity = city.value;
}

function getLocal() {
  var retrieve = localStorage.getItem("Cities-Searched");
  if (retrieve === null) {
    return [];
  }
  return JSON.parse(retrieve);
}
//EVENT LISTENERS
document
  .querySelector(".searchBtn")
  .addEventListener("click", function (event) {
    var citySearch = city.value;
    var previousSearches = getLocal();
    previousSearches.push(citySearch);
    localStorage.setItem("Cities-Searched", JSON.stringify(previousSearches));
    fetchApi(requestUrl);
  });
