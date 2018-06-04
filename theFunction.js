var latlon = [];
var weatherObj;
var daURL = "";
var currentMode = "wi-celsius";
var currentTemp = 0;
var currentConditions = "";
var toggleContrast = false;
var bugJapan = "Shuzenji"
var checker = ""
//Math.round(parseInt($("#temp").text()) * 9 / 5 + 32);

$( document ).ready(function(){
  $(".mainStat").hide();

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      saveLocation(position.coords.latitude, position.coords.longitude);
    });
  } else {
    $(".daCity").html("Geolocation is not supported by this browser.");
    console.log("Geolocation is not supported by this browser.");
  }
});

function saveLocation(daOne, daTwo){
  latlon.push(daOne,daTwo);
  daURL ="https://fcc-weather-api.glitch.me/api/current?lat=";
  daURL += latlon[0];
  daURL += "&lon=";
  daURL += latlon[1];


  // This test is to retrieve data from the API
  $.getJSON(daURL, function(json) {
    // Get string into a variable
    var string = (JSON.stringify(json));
    // Convert string into object
    weatherObj = JSON.parse(string);
    // Save currentTemprature

  })
  .done(function() {
    console.log(weatherObj);
    currentTemp = weatherObj.main.temp;

    $(".mainStat").show().addClass("animated fadeIn");

    $(".daCity").html(weatherObj.name.toUpperCase() + ", "  + weatherObj.sys.country.toUpperCase());

    if (currentMode == "wi-fahrenheit") {
      currentTemp = currentTemp * 9 / 5 + 32;
      $(".daTemp").html(currentTemp + "<i id=\"daMode\" class=\"daMode wi wi-fahrenheit\">");
    } else if (currentMode == "wi-celsius") {
      currentTemp = weatherObj.main.temp;
      $(".daTemp").html(currentTemp + "<i id=\"daMode\" class=\"daMode wi wi-celsius\">");
    };

    $(".daIcon").click( function hello(){
      if (toggleContrast == false) {
        $(':root').css({'--daColor': "white"})
        $(':root').css({'--daFontColor': "black"})
        toggleContrast = true;
      } else if (toggleContrast == true) {
        $(':root').css({'--daColor': "black"})
        $(':root').css({'--daFontColor': "white"})
        toggleContrast = false;
      }
    });

    //With this way jQuery listens into the change in the document.
    $(document).on("click", ".daMode", function() {
      if (currentMode == "wi-fahrenheit") {
        currentTemp = weatherObj.main.temp;
        $(".daTemp").html(currentTemp + "<i id=\"daMode\" class=\"daMode wi wi-celsius\">");
        currentMode = "wi-celsius";
      } else if (currentMode == "wi-celsius") {
        currentTemp = Math.round(currentTemp * 9 / 5 + 32);
        $(".daTemp").html(currentTemp + "<i id=\"daMode\" class=\"daMode wi wi-fahrenheit\">");
        currentMode = "wi-fahrenheit";
      }
    });



    $(".daDes").html(weatherObj.weather[0].main.toUpperCase() + ": " + weatherObj.weather[0].description.toUpperCase());

    currentConditions = weatherObj.weather[0].main.toLowerCase();;

    switch (currentConditions) {
      case 'drizzle':
        $(".daIcon").addClass("wi-sprinkle").addClass("animated pulse");
        break;
      case 'clouds':
        $(".daIcon").addClass("wi-cloudy").addClass("animated pulse");
        break;
      case 'rain':
        $(".daIcon").addClass("wi-rain").addClass("animated pulse");
        break;
      case 'snow':
        $(".daIcon").addClass("wi-snow").addClass("animated pulse");
        break;
      case 'clear':
        $(".daIcon").addClass("wi-day-sunny").addClass("animated pulse");
        break;
      case 'thunderstorm':
        $(".daIcon").addClass("wi-thunderstorm").addClass("animated pulse");
        break;
      case 'haze':
        $(".daIcon").addClass("wi-fog").addClass("animated pulse");
        break;
      default:
        $('.daIcon').addClass("wi-na").addClass("animated pulse");
      }

  })

  console.log("latlon: " + latlon);
  console.log("daURL: " + daURL);



}
