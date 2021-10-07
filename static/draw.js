///////////////////////////////////////////////////////////////
//Part for search bar
//function to disable the selection bar
var numberOfDate = 0;

function Disableddl(chkddl){
    var street = document.getElementById("Street");
    var state = document.getElementById("State");
    var city = document.getElementById("City")
    street.disabled = chkddl.checked? true:false;
    state.disabled = chkddl.checked? true:false;
    city.disabled = chkddl.checked? true:false;
    street.value = "";
    state.value = "";
    city.value = "";
    if(!street.disabled && !state.disabled && !city.disabled){
        street.focus();
        state.focus();
        city.focus();
    }
}


//Part for Detailed Weather Chart and the menu
// after getreq
function drawWeatherChart(){
    var intervals = jinfo.data.timelines[0].intervals;
    var firstdayData = intervals[0].values;
    var weatherCard = document.getElementById("weatherCard");
        //we visible the weather card.
    var showBox = document.getElementById("showBox");
    showBox.style.visibility = "visible";
 
        //change picture
    var bigPic = weatherCard.querySelector('.bigPic')
    var weatherCode = firstdayData.weatherCode;
    //console.log(picture[weatherCode])
    bigPic.src = picture[weatherCode]
        //change claearity
    var clearity = weatherCard.querySelector('.clearity');
    clearity.innerHTML = WeatherDes[firstdayData.weatherCode];
 
        //change big Tempreature
    var bigTempreature = weatherCard.querySelector('.bigTempreature');
    bigTempreature.innerHTML = parseFloat((firstdayData.temperature - 32) * 0.5556).toFixed(1)+ "\u00B0";

        //Change weatherDetail
    document.getElementById('Humidity_N').innerHTML = firstdayData.humidity + "%";
    document.getElementById('Pressure_N').innerHTML = parseFloat(firstdayData.pressureSeaLevel * 33.3).toFixed(2) + " inHg";
    document.getElementById('WindSpeed_N').innerHTML = firstdayData.windSpeed + " mph";
    document.getElementById('Visibility_N').innerHTML = firstdayData.visibility + " mi";
    document.getElementById('CloudCover_N').innerHTML = firstdayData.cloudCover + " %";
    document.getElementById('UVLevel_N').innerHTML = firstdayData.uvIndex;


    var timelineTable = document.getElementById('timelineTable');
    var SecondIntervals = jinfo.data.timelines[1].intervals;
    for(var i = 0; i < intervals.length; i ++){
        
        //create row  
        var s = SecondIntervals[i]
        if(typeof s === 'undefined'){continue;}
        var r = document.createElement('tr')
        //add id to r
        r.dataset.personId = i;
        r.class = "timelineContent"
        numberOfDate ++;
        //create date column
        var dateCell = document.createElement('td');
        const date = dayjs(s.startTime).format('dddd, DD MMM YYYY');
        dateCell.textContent = date;
        //create status cell
        var statusCell = document.createElement('td');
        var statusimg = document.createElement('img');
        statusimg.height = "50";
        statusimg.width = "50";
        statusimg.src = picture[s.values.weatherCode];
        statusCell.appendChild(statusimg);
        var description = document.createElement('a')
        description.textContent = WeatherDes[s.values.weatherCode];
        statusCell.appendChild(description);

        //create Temp High col
        var TemHigh = document.createElement('td');
        TemHigh.textContent = s.values.temperatureMax;

        //create Temp Low col
        var TemLow = document.createElement('td');
        TemLow.textContent = s.values.temperatureMax;

        //create WindSpeed col
        var WindSpeed = document.createElement('td');
        WindSpeed.textContent = s.values.windSpeed;

        //append element in to the html.
        r.appendChild(dateCell);
        r.appendChild(statusCell);
        r.appendChild(TemHigh);
        r.appendChild(TemLow);
        r.appendChild(WindSpeed);
        timelineTable.appendChild(r);

        //lets add clickHandler to the row
        //here s is the current data from interval.
        var createClickHandler = function(curData,jinfo){
            return function(){
                //console.log("click!");
                //console.log(data);
                changeWeatherDetail(curData);
                drawFinalChart(curData,jinfo);
            }
        };
        r.style.cursor = "pointer";
        //place the pass data.
        r.onclick = createClickHandler(s,jinfo);
               
    }
}


//function for change the weather detail.
function changeWeatherDetail(data){
    var values = data.values;
    //console.log(values);
    //console.log(intervals);
    //hide menu.

    //change the weather detail.
        //change bigpic
    var weatherCard = document.getElementById("weatherCard");
    var bigPic = weatherCard.querySelector('.bigPic');
    var weatherCode = values.weatherCode;
    bigPic.src = picture[weatherCode];
        //change clearity
    var clearity =weatherCard.querySelector('.clearity')
    clearity.innerHTML = WeatherDes[values.weatherCode];
        //change date
    var addressTitle =  weatherCard.querySelector('.addressTitle')
    var date = dayjs(values.startTime).format('ddd, DD MMM YYYY');
    addressTitle.innerHTML = date;
        //change big Tempreature
    var bigTempreature = weatherCard.querySelector('.bigTempreature')
    var newTemp1 = parseFloat(values.temperatureMax).toFixed(2);
    var newTemp2 = parseFloat(values.temperatureMin).toFixed(2);
    var newTemp = newTemp1 + "\u00B0" + "F" + "/" + newTemp2 + "\u00B0" + "F"
    bigTempreature.innerHTML = newTemp;
        //changeWeatherDetail
        var WeatherDetail = document.getElementById('weatherDetail');
            //change humidity to precipitation
    var n1 = WeatherDetail.querySelector('.humidity');
    n1.querySelector('.description').innerHTML = "Precipitation:"
    n1.querySelector('.pic').style.visibility = "hidden";
    n1.querySelector('.pic').width = "0";
    n1.querySelector('.pic').height = "0";
    document.getElementById('Humidity_N').innerHTML = precipitationType[values.precipitationType];
            //change pressure to chance of rain
    var n2 = WeatherDetail.querySelector('.Pressure');
    n2.querySelector('.description').innerHTML = "Change of Rain:"
    n2.querySelector('.pic').style.visibility = "hidden";
    n2.querySelector('.pic').width = "0";
    n2.querySelector('.pic').height = "0";
    document.getElementById('Pressure_N').innerHTML = values.precipitationProbability + "%";
            //keep wind speed
    var n3 = WeatherDetail.querySelector('.WindSpeed');
    n3.querySelector('.pic').style.visibility = "hidden";
    n3.querySelector('.pic').width = "0";
    n3.querySelector('.pic').height = "0";
            //change visivility to humidity
    var n4 = WeatherDetail.querySelector('.Visibility');
    n4.querySelector('.description').innerHTML = "Humidity:"
    n4.querySelector('.pic').style.visibility = "hidden";
    n4.querySelector('.pic').width = "0";
    n4.querySelector('.pic').height = "0";
    document.getElementById('Visibility_N').innerHTML = values.humidity + "%";
            //change cloudCover to Visibility 
    var n5 = WeatherDetail.querySelector('.CloudCover');
    n5.querySelector('.description').innerHTML = "Visivility:"
    n5.querySelector('.pic').style.visibility = "hidden";
    n5.querySelector('.pic').width = "0";
    n5.querySelector('.pic').height = "0";
    document.getElementById('CloudCover_N').innerHTML = values.visibility + "mi";
            //change UVLevel to Sunrise/Sunset
    const startTime = dayjs(values.sunriseTime).format('H');
    const endTime = dayjs(values.sunsetTime).format('H');
    var n6 = WeatherDetail.querySelector('.UVLevel');
    n6.querySelector('.description').innerHTML = "Sunrise/Sunset:"
    n6.querySelector('.pic').style.visibility = "hidden";
    n6.querySelector('.pic').width = "0";
    n6.querySelector('.pic').height = "0";
    document.getElementById('UVLevel_N').innerHTML = startTime + "AM/" + endTime + "PM";
    //change the weather detail csss
    document.getElementById('stylesheetChange').setAttribute('href', '/static/stylesSecond.css')

    //create big button
    var descriptionTitle = document.createElement("h1");
    descriptionTitle.innerHTML = "Weather Chart";
    var showChart = document.getElementById('showChart');
    showChart.appendChild(descriptionTitle);
    let btn = document.createElement("img");
    btn.src = "./static/images/point-down-512.png";
    btn.style.cursor = "pointer";
    btn.addEventListener('click',function(){
      document.getElementById('timeCard').style.visibility = 'visible'
    })
    showChart.appendChild(btn);

    //one more title
    var descriptionTitle = document.createElement("h1");
    descriptionTitle.innerHTML = "Daily Weather Details";
    document.getElementById('Moretitle').appendChild(descriptionTitle);
}




//function for draw the chart. 
function drawFinalChart(data,jinfo){
    //conceal weather chart
    document.getElementById('timeline').style.visibility = 'hidden';
    //console.log(data);
    //console.log(jinfo);
    var intervals = jinfo.data.timelines[1].intervals
    //console.log(intervals)
    var insertJson = []
    for(var i = 0; i < intervals.length; i ++){
        var thistime = intervals[i].startTime;
        const uTime = parseFloat(dayjs(thistime).unix()* 1000);
        //console.log(uTime)
        const maxTemp = intervals[i].values.temperatureMax
        const minTemp = intervals[i].values.temperatureMin
        const addin = [uTime,maxTemp,minTemp]
        insertJson.push(addin)
    }
    
    Highcharts.getJSON(
        'https://cdn.jsdelivr.net/gh/highcharts/highcharts@v7.0.0/samples/data/range.json',
        function(data) {
        data = insertJson
          Highcharts.chart('container2', {
      
            chart: {
              type: 'arearange',
              zoomType: 'x',
              scrollablePlotArea: {
                minWidth: 600,
                scrollPositionX: 1
              }
            },
      
            title: {
              text: 'Temperature Ranges(Min,Max)'
            },
      
            xAxis: {
              type: 'datetime',
              accessibility: {
                rangeDescription: 'Range: Jan 1st 2017 to Dec 31 2017.'
              }
            },
      
            yAxis: {
              title: {
                text: null
              }
            },
      
            tooltip: {
              crosshairs: true,
              shared: true,
              valueSuffix: '°C',
              xDateFormat: '%A, %b %e'
            },
      
            legend: {
              enabled: false
            },

            series: [{
              name: 'Temperatures',
              data: data,
              fillColor : '#F5B041'
            }]
        });
      }
    );

    // lets tidy data.


    var TodayDate = data.startTime;
    var intervals = jinfo.data.timelines[0].intervals;
    //console.log(intervals);
    //console.log(TodayDate)
    var TodayDate1 = dayjs().format('MM-DD');
    var FiveDaysLater = dayjs(TodayDate).add(6,'day');
    var FiveDaysLater1 = dayjs(FiveDaysLater).format('MM-DD');
    //console.log(TodayDate1)
    //console.log(FiveDaysLater1)


    //add inputData
    var inputData = {}
    

    var timeseries = []
    // TodayDate1,  FiveDaysLater1
    //console.log(inputData);
    for(var i = 0; i < intervals.length; i ++){
        var cur = intervals[i];
        var curValues = cur.values;
        var curDate = intervals[i].startTime;
        var start = true;
        var curDate1 = dayjs(curDate).format('MM-DD');
        //stop after 5 days later. 
        if(curDate1 == FiveDaysLater1){
            break;
        }
        if(start){
            //we add in data.
            var details = {} 
            var apasl = curValues['pressureSeaLevel'];
            var at = curValues['temperature'];
            var caf = curValues['cloudCover'];
            var rh = curValues['humidity'];
            var wfd = curValues['windDirection'];
            var ws = curValues['windSpeed']
            details['air_pressure_at_sea_level'] = apasl;
            details['air_temperature'] = at;
            details['cloud_area_fraction'] = caf;
            details['relative_humidity'] = rh;
            details['wind_from_direction'] = wfd;
            details['wind_speed'] = ws;

            var instant = {}
            instant['details'] = details;
            

            var data = {'instant' : instant}
            data['next_12_hours'] = {"summary":{"symbol_code": "clearsky"}}
            data['next_1_hours'] = {"summary":{"symbol_code": "clearsky"},"details":{"precipitation_amount": 0}}
            data['next_6_hours'] = {"summary":{"symbol_code": "clearsky"},"details":{"precipitation_amount": 0}}
            var belowTimeseries = {}
            belowTimeseries['time'] = curDate;
            belowTimeseries['data'] = data;
            timeseries.push(belowTimeseries);
        }
        //break when the date is 6's day
    }
    var properties = {}
    properties["meta"] = {"units":{"air_pressure_at_sea_level":"hPa", 
    "air_temperature":"celsius","cloud_area_fraction":"%",
    "precipitation_amount":"mm","relative_humidity":"%",
    "wind_from_direction":"degrees","wind_speed":"m/s"}};
    properties['timeseries'] = timeseries;
    inputData["properties"] = properties;
    //console.log(inputData)

    
    






      Highcharts.ajax({
        url,
        dataType: 'json',
        success: json => {
            window.meteogram = new Meteogram(inputData, 'container');
        },
        error: Meteogram.prototype.error,
        headers: {
            // Override the Content-Type to avoid preflight problems with CORS
            // in the Highcharts demos
            'Content-Type': 'text/plain'
        }
    });




}


function AllClear(){
  document.getElementById('showBox').style.visibility = 'hidden'
}


