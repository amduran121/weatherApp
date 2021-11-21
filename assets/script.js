var timeEl = document.getElementById('time');
var dateEl = document.getElementById('date');
var currentWeatherItemsEl = document.getElementById('current-weather-items');
var timezone = document.getElementById('time-zone');
var countryEl = document.getElementById('country');
var weatherForecastEl = document.getElementById('weather-forecast');
var currentTempEl = document.getElementById('current-temp');


var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var API_KEY ='49cc8c821cd2aff9af04c9f98c36eb74';

setInterval(() => {
    var time = new Date();
    var month = time.getMonth();
    var date = time.getDate();
    var day = time.getDay();
    var hour = time.getHours();
    var hoursIn12HrFormat = hour >= 13 ? hour %12: hour
    var minutes = time.getMinutes();
    var ampm = hour >=12 ? 'PM' : 'AM'

    timeEl.innerHTML = (hoursIn12HrFormat < 10? '0'+hoursIn12HrFormat : hoursIn12HrFormat) + ':' + (minutes < 10? '0'+minutes: minutes)+ ' ' + `<span id="am-pm">${ampm}</span>`

    dateEl.innerHTML = days[day] + ', ' + date+ ' ' + months[month]

}, 1000);

getWeatherData()
function getWeatherData () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`).then(res => res.json()).then(data => {

        console.log(data)
        showWeatherData(data);
        })

    })
}

function showWeatherData (data){
    let {humidity, pressure, sunrise, sunset, wind_speed} = data.current;

    timezone.innerHTML = data.timezone;
    countryEl.innerHTML = data.lat + 'N ' + data.lon+'E'

    currentWeatherItemsEl.innerHTML = 
    `<div class="weather-item">
        <div>Humidity</div>
        <div>${humidity}%</div>
    </div>
    <div class="weather-item">
        <div>Pressure</div>
        <div>${pressure}</div>
    </div>
    <div class="weather-item">
        <div>Wind Speed</div>
        <div>${wind_speed}</div>
    </div>
    <div class="weather-item">
        <div>Sunrise</div>
        <div>${window.moment(sunrise * 1000).format('HH:mm a')}</div>
    </div>
    <div class="weather-item">
        <div>Sunset</div>
        <div>${window.moment(sunset*1000).format('HH:mm a')}</div>
    </div>
    
    
    `;

    let otherDayForcast = ''
    data.daily.forEach((day, idx) => {
        if(idx == 0){
            currentTempEl.innerHTML = `
            <img src="http://openweathermap.org/img/wn//${day.weather[0].icon}@4x.png" alt="weather icon" class="w-icon">
            <div class="other">
                <div class="day">${window.moment(day.dt*1000).format('dddd')}</div>
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }else{
            otherDayForcast += `
            <div class="weather-forecast-item">
                <div class="day">${window.moment(day.dt*1000).format('ddd')}</div>
                <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="weather icon" class="w-icon">
                <div class="temp">Night - ${day.temp.night}&#176;C</div>
                <div class="temp">Day - ${day.temp.day}&#176;C</div>
            </div>
            
            `
        }
    })


    weatherForecastEl.innerHTML = otherDayForcast;
// function initPage() {
//   const inputEl = document.getElementById("city-input");
//   const searchEl = document.getElementById("search-button");
//   const clearEl = document.getElementById("clear-history");
//   const nameEl = document.getElementById("city-name");
//   const currentPicEl = document.getElementById("current-pic");
//   const currentTempEl = document.getElementById("temperature");
//   const currentHumidityEl = document.getElementById("humidity");
//   4;
//   const currentWindEl = document.getElementById("wind-speed");
//   const currentUVEl = document.getElementById("UV-index");
//   const historyEl = document.getElementById("history");
//   let searchHistory = JSON.parse(localStorage.getItem("search")) || [];
//   console.log(searchHistory);

//   const APIKey = "aa2cf9999a020baafc7c25b8f844ea9c";
//   //  When search button is clicked, read the city name typed by the user

//   function getWeather(cityName) {
//     //  Using saved city name, execute a current condition get request from open weather map api
//     let queryURL =
//       "https://api.openweathermap.org/data/2.5/forecast?q=" +
//       cityName +
//       "&appid=" +
//       APIKey;
//     axios.get(queryURL).then(function (response) {
//       console.log(response);
//       //  Parse response to display current conditions
//       //  Method for using "date" objects obtained from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
//       const currentDate = new Date(response.data.dt * 1000);
//       console.log(currentDate);
//       const day = currentDate.getDate();
//       const month = currentDate.getMonth() + 1;
//       const year = currentDate.getFullYear();
//       nameEl.innerHTML =
//         response.data.name + " (" + month + "/" + day + "/" + year + ") ";
//       let weatherPic = response.data.weather[0].icon;
//       currentPicEl.setAttribute(
//         "src",
//         "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png"
//       );
//       currentPicEl.setAttribute("alt", response.data.weather[0].description);
//       currentTempEl.innerHTML =
//         "Temperature: " + k2f(response.data.main.temp) + " &#176F";
//       currentHumidityEl.innerHTML =
//         "Humidity: " + response.data.main.humidity + "%";
//       currentWindEl.innerHTML =
//         "Wind Speed: " + response.data.wind.speed + " MPH";
//       let lat = response.data.coord.lat;
//       let lon = response.data.coord.lon;
//       let UVQueryURL =
//         "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
//         lat +
//         "&lon=" +
//         lon +
//         "&appid=" +
//         APIKey +
//         "&cnt=1";
//       axios.get(UVQueryURL).then(function (response) {
//         let UVIndex = document.createElement("span");
//         UVIndex.setAttribute("class", "badge badge-danger");
//         UVIndex.innerHTML = response.data[0].value;
//         currentUVEl.innerHTML = "UV Index: ";
//         currentUVEl.append(UVIndex);
//       });
//       //  Using saved city name, execute a 5-day forecast get request from open weather map api
//       let cityID = response.data.id;
//       let forecastQueryURL =
//         "https://api.openweathermap.org/data/2.5/forecast?id=" +
//         cityID +
//         "&appid=" +
//         APIKey;
//       axios.get(forecastQueryURL).then(function (response) {
//         //  Parse response to display forecast for next 5 days underneath current conditions
//         console.log(response);
//         const forecastEls = document.querySelectorAll(".forecast");
//         for (i = 0; i < forecastEls.length; i++) {
//           forecastEls[i].innerHTML = "";
//           const forecastIndex = i * 8 + 4;
//           const forecastDate = new Date(
//             response.data.list[forecastIndex].dt * 1000
//           );
//           const forecastDay = forecastDate.getDate();
//           const forecastMonth = forecastDate.getMonth() + 1;
//           const forecastYear = forecastDate.getFullYear();
//           const forecastDateEl = document.createElement("p");
//           forecastDateEl.setAttribute("class", "mt-3 mb-0 forecast-date");
//           forecastDateEl.innerHTML =
//             forecastMonth + "/" + forecastDay + "/" + forecastYear;
//           forecastEls[i].append(forecastDateEl);
//           const forecastWeatherEl = document.createElement("img");
//           forecastWeatherEl.setAttribute(
//             "src",
//             "https://openweathermap.org/img/wn/" +
//               response.data.list[forecastIndex].weather[0].icon +
//               "@2x.png"
//           );
//           forecastWeatherEl.setAttribute(
//             "alt",
//             response.data.list[forecastIndex].weather[0].description
//           );
//           forecastEls[i].append(forecastWeatherEl);
//           const forecastTempEl = document.createElement("p");
//           forecastTempEl.innerHTML =
//             "Temp: " +
//             k2f(response.data.list[forecastIndex].main.temp) +
//             " &#176F";
//           forecastEls[i].append(forecastTempEl);
//           const forecastHumidityEl = document.createElement("p");
//           forecastHumidityEl.innerHTML =
//             "Humidity: " +
//             response.data.list[forecastIndex].main.humidity +
//             "%";
//           forecastEls[i].append(forecastHumidityEl);
//         }
//       });
//     });
//   }

//   searchEl.addEventListener("click", function () {
//     const searchTerm = inputEl.value;
//     getWeather(searchTerm);
//     searchHistory.push(searchTerm);
//     localStorage.setItem("search", JSON.stringify(searchHistory));
//     renderSearchHistory();
//   });

//   clearEl.addEventListener("click", function () {
//     searchHistory = [];
//     renderSearchHistory();
//   });

//   function k2f(K) {
//     return Math.floor((K - 273.15) * 1.8 + 32);
//   }

//   function renderSearchHistory() {
//     historyEl.innerHTML = "";
//     for (let i = 0; i < searchHistory.length; i++) {
//       const historyItem = document.createElement("input");
//       // <input type="text" readonly class="form-control-plaintext" id="staticEmail" value="email@example.com"></input>
//       historyItem.setAttribute("type", "text");
//       historyItem.setAttribute("readonly", true);
//       historyItem.setAttribute("class", "form-control d-block bg-white");
//       historyItem.setAttribute("value", searchHistory[i]);
//       historyItem.addEventListener("click", function () {
//         getWeather(historyItem.value);
//       });
//       historyEl.append(historyItem);
//     }
//   }

//   renderSearchHistory();
//   if (searchHistory.length > 0) {
//     getWeather(searchHistory[searchHistory.length - 1]);
//   }

//   //  Save user's search requests and display them underneath search form
//   //  When page loads, automatically generate current conditions and 5-day forecast for the last city the user searched for
// }
// initPage();
// // //VARIABLES
// // var searchBtn = document.querySelector(".searchBtn");
// // /* var myKey = c89a29a2eb4fd0383a0dac22a0a8e52c";
// // var city = document.getElementsByClassName(“userInput”);
// // var requestUrl = `api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${myKey}`; */
// // function fetchApi() {
// //   var myKey = "c89a29a2eb4fd0383a0dac22a0a8e52c";
// //   var city = document.querySelector(".userInput");
// //   var userInput = city.value;
// //   var requestUrl = `https://api.openweathermap.org/data/2.5/forecast/?q=${userInput}&appid=${myKey}`;
// //   fetch(requestUrl)
// //     .then(function (response) {
// //       var data = response.json();
// //       return data;
// //     })
// //     .then(function (data) {
// //       localStorage.setItem(userInput, JSON.stringify(data));
// //     });
// // }
// // /* function getLocal() {
// //   var retrieve = localStorage.getItem(userInput);
// //   if (retrieve === null) {
// //     return [];
// //   }
// //   return JSON.parse(retrieve);
// // } */
// // //EVENT LISTENERS
// // document
// //   .querySelector(".searchBtn")
// //   .addEventListener("click", function (event) {
// //     /*     var citySearch = city.value;
// //     var previousSearches = getLocal();
// //     previousSearches.push(citySearch);
// //     localStorage.setItem(“Cities-Searched”, JSON.stringify(previousSearches));
// //     fetchApi(requestUrl); */
// //     fetchApi();
// //   });
