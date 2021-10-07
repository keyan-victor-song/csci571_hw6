//take value for search bar
var addressTitleString = "aaa";

function takevalue(){
    var chkddl = document.getElementById("chkddl")
    if(chkddl.checked){
        getLocationandCall();
    }
    else{
        var Street=document.getElementById("Street").value;
        var City=document.getElementById("City").value;
        var State=document.getElementById("State").value;
        var location = Street + ' ' + City + ' ' + State; 
        //alert(location);
        geocode(location);
    }
}

function geocode(location){
    var location = location
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?',{
        params:{
            address:location,
            key:'AIzaSyCSe5IoOBXnReuF_s3MP6ECWx0tu_6XH7g'
            }
    })
    .then(function(response){
        
        var lat = response.data.results[0].geometry.location.lat;
        var lng = response.data.results[0].geometry.location.lng;
        console.log(response.data)
         //change address
        var name1 = response.data.results[0].address_components[3].long_name;
        var name2 = response.data.results[0].address_components[5].long_name;
        addressTitleString = name1 + ', ' + name2;
        var addressTitle =  weatherCard.querySelector('.addressTitle')
        addressTitle.innerHTML = addressTitleString;

        getreq(lat,lng);
    })
    .catch(function(error){
        console.log(error);
    })    
}


function geocodereverse(lat,lng){
    var latlng = lat.toString() + "," + lng.toString();
    axios.get('https://maps.googleapis.com/maps/api/geocode/json?',{
        params:{
            latlng:latlng,
            key:'AIzaSyCSe5IoOBXnReuF_s3MP6ECWx0tu_6XH7g'
            }
    })
    .then(function(response){
        //console.log(response.data.results[0].formatted_address);
        //change address
        addressTitleString = response.data.results[0].formatted_address;
        var name1 = response.data.results[0].address_components[3].long_name;
        var name2 = response.data.results[0].address_components[5].long_name;
        var addressTitle =  weatherCard.querySelector('.addressTitle')
        addressTitle.innerHTML = name1 + ', ' + name2;
        getreq(lat,lng);
    })
    .catch(function(error){
        console.log(error);
    })    
}


//get our weather info
//Then we drwa the chart!
function getreq(lat,lng){
   fetch('/item?' + new URLSearchParams({lat: lat,lng: lng,})
   ,{
       method:'GET'
   }).then(res => {
    return res.json()
   })
   .then(data => {
    jinfo = data;
    console.log(jinfo);
    drawWeatherChart();
   })
   .catch(error => console.log('ERROR'))
}


function getLocationandCall() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(UseCurrent);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function UseCurrent(position) {
    // var x = document.getElementById("raw_data");
    // x.innerHTML = "Latitude: " + position.coords.latitude + 
    // "<br>Longitude: " + position.coords.longitude;
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;
    geocodereverse(lat,lng)
    getreq(lat,lng);
}









//AIzaSyCSe5IoOBXnReuF_s3MP6ECWx0tu_6XH7g








