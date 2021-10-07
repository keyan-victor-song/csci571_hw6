
var jinfo = {};

function Testgrab(){
    fetch("./static/jinfo.json")
.then(response => {
   return response.json();
})
.then(data => {
    jinfo = data;
    console.log("aaa")
    drawWeatherChart();
})
}

var WeatherDes = {
    "4201": "Heavy Rain",
    "4001": "Rain",
    "4200": "Light Rain",
    "6201": "Heavey Freezing Rain",
    "6001":"Freezing Rain",
    "6200":"Light Freezing Rain",
    "6000":"Freezing Drizzle",
    "4000":"Drizzle",
    "7101":"Heavey ice Pellets",
    "7000":"Ice Pellets",
    "7102":"Light Ice Pellets",
    "5101":"Heavy Snow",
    "5100":"Light Snow",
    "5000":"Snow",
    "5001":"Flurries",
    "8000":"Thunderstorm",
    "2100": "Light Fog",
    "2000":"Fog",
    "1001":"Cloudy",
    "1102":"Mostly Cloudy",
    "1101":"Partyly Cloudy",
    "1100":"Mostly Clear",
    "1000":"Clear, Sunny",
};

var currentAddress = "aaaaaaaa";
var picture = {
    "1000": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/clear_day.svg",
    "1100": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/mostly_clear_day.svg",
    "1101": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/partly_cloudy_day.svg",
    "1102" : "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/mostly_cloudy.svg",
    "1101" : "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/cloudy.svg",
    "1001" : "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/cloudy.svg",
    "2000" : "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/fog.svg",
    "2100" : "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/fog_light.svg",
    "8000" : "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/tstorm.svg",
    "5001" : "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/flurries.svg",
    "5000" : "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/snow.svg",
    "5100" : "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/snow_light.svg",
    "5101": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/snow_heavy.svg",
    "7102": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/ice_pellets.svg",
    "7000": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/ice_pellets.svg",
    "7101": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/ice_pellets.svg",
    "4000": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/drizzle.svg",
    "6000": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/drizzle.svg",
    "6200": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/drizzle.svg",
    "6001": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/drizzle.svg",
    "6201": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/drizzle.svg",
    "4001": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/rain.svg",
    "4200": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/rain_light.svg",
    "4201": "https://raw.githubusercontent.com/Tomorrow-IO-API/tomorrow-weather-codes/master/color/rain_heavy.svg"
}

var precipitationType =  {
    "0": "N/A",
    "1": "Rain",
    "2": "Snow",
    "3": "Freezing Rain",
    "4": "Ice Pellets"
  }