//VARIABLES
var searchBtn = document.getElementsByClassName("searchBtn");
var city = document.getElementsByClassName("userInput");
var requestUrl =
  `api.openweathermap.org/data/2.5/forecast?q=` +
  city.value +
  `&appid=4c4bcf68ece59c4349091a9dded4ab01`;
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
/* function cityInput(event) {
  event.preventDefault();
  var userCity = city.value;
}
 */
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
