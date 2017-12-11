window.onload = function() {
	
	
	 clock();  

    function clock() {
    var now = new Date();
    var TwentyFourHour = now.getHours();
    var hour = now.getHours();
    var min = now.getMinutes();
    var mid = ' PM';
    if (min < 10) {
      min = "0" + min;
    }

    if (hour > 12) {
      hour = hour - 12;
    }
      
    if(hour==0){ 
      hour=12;
    }

    if(TwentyFourHour < 12) {
       mid = ' AM';
    }
      
    document.getElementById('currentTime').innerHTML = hour+':'+min + mid ;
    setTimeout(clock, 1000);

  }
	
	
  var httpLocation;
  var httpWeather;
  
  function LocationRequest() {
    httpLocation = new XMLHttpRequest();  

    if (!httpLocation) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }

    httpLocation.onreadystatechange = appendLocation;
    httpLocation.open('GET', 'https://ipinfo.io/json', true);
    httpLocation.send();
  }
  
  

  function appendLocation() {
     if (httpLocation.readyState === XMLHttpRequest.DONE) {
      if (httpLocation.readyState === 4 && httpLocation.status === 200) {
        var locationResponse = httpLocation.response;
        var jsonLocation = JSON.parse(locationResponse);
        document.getElementById("location").innerHTML = jsonLocation.city + ',' + jsonLocation.country;
        console.log(jsonLocation);
        WeatherRequest(jsonLocation);
      } else {
        alert('There was a problem with the XMLHttpRequest. Location could not be found');
      }
    }
  }
 
  function WeatherRequest(locationResponse) {
    httpWeather = new XMLHttpRequest();

    if (!httpWeather) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
   
    httpWeather.onreadystatechange = appendWeather;
    httpWeather.open('GET', 'https://api.apixu.com/v1/current.json?key=e6bff78d320a4d57a72145227172605&q=' + locationResponse.loc, true);
    httpWeather.send();
  }

  function appendWeather() {
    if (httpWeather.readyState === XMLHttpRequest.DONE) {
      if (httpWeather.readyState === 4 && httpWeather.status === 200) {
        var jsonWeather = JSON.parse(httpWeather.response);
        var icon = jsonWeather.current.condition.icon;        
        console.log(jsonWeather);
         document.getElementById("weather").innerHTML = jsonWeather.current.temp_f + ' &degF';

         document.getElementById("weather-icon").setAttribute("src", icon);
      } else {
        alert('There was a problem with the XMLHttpRequest. Weather could not be found');
      }
    }
  }

  LocationRequest();
};

