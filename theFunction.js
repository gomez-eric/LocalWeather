var latlon = [];
var weatherObj;
var URL = "";
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
    }, function error(e) {
      failedLoad(e);
    });
  } else {
    $(".mainStat").show().addClass("animated fadeIn");
    $(".City").html("GEOLOCATION IS NOT SUPPORTED BY THIS BROWSER.");
    console.log("GEOLOCATION IS NOT SUPPORTED BY THIS BROWSER.");
  }
});

function failedLoad(e){
  $(".mainStat").show().addClass("animated fadeIn");
  if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
    $(".City").html("TURN LOCATION ON");
  } else {
    $(".City").html("SITE NEEDS GEOLOCATION TO FUNCTION");
    navigator.geolocation.getCurrentPosition(function() {
      window.location.reload();
    });

  }

  console.log(e);
}

function saveLocation(One, Two){
  latlon.push(One,Two);
  URL ="https://fcc-weather-api.glitch.me/api/current?lat=";
  URL += latlon[0];
  URL += "&lon=";
  URL += latlon[1];


  // This test is to retrieve data from the API
  $.getJSON(URL, function(json) {
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
    $(".City").html(weatherObj.name.toUpperCase() + ", "  + weatherObj.sys.country.toUpperCase());

    if (currentMode == "wi-fahrenheit") {
      currentTemp = currentTemp * 9 / 5 + 32;
      $(".Temp").html(currentTemp + "<i id=\"Mode\" class=\"Mode wi wi-fahrenheit\">");
    } else if (currentMode == "wi-celsius") {
      currentTemp = weatherObj.main.temp;
      $(".Temp").html(currentTemp + "<i id=\"Mode\" class=\"Mode wi wi-celsius\">");
    };

    $(".Icon").click( function (){
      if (toggleContrast == false) {
        document.body.style.setProperty('--bg_Color', 'white');
        document.body.style.setProperty('--font_Color', 'black');
        toggleContrast = true;
      } else if (toggleContrast == true) {
        document.body.style.setProperty('--bg_Color', 'black');
        document.body.style.setProperty('--font_Color', 'white');
        toggleContrast = false;
      }
    });

    //With this way jQuery listens into the change in the document.
    $(document).on("click mousedown", ".Mode", function(e) {
      if(e.which != 3){ // prevents right click switch
        if (currentMode == "wi-fahrenheit") {
          currentTemp = weatherObj.main.temp;
          $(".Temp").html(currentTemp + "<i id=\"Mode\" class=\"Mode wi wi-celsius\">");
          currentMode = "wi-celsius";
        } else if (currentMode == "wi-celsius") {
          currentTemp = Math.round(currentTemp * 9 / 5 + 32);
          $(".Temp").html(currentTemp + "<i id=\"Mode\" class=\"Mode wi wi-fahrenheit\">");
          currentMode = "wi-fahrenheit";
        }
      }
    });



    $(".Des").html(weatherObj.weather[0].main.toUpperCase() + ": " + weatherObj.weather[0].description.toUpperCase());

    currentConditions = weatherObj.weather[0].main.toLowerCase();;

    switch (currentConditions) {
      case 'drizzle':
        $(".Icon").addClass("wi-sprinkle").addClass("animated pulse");
        break;
      case 'clouds':
        $(".Icon").addClass("wi-cloudy").addClass("animated pulse");
        break;
      case 'rain':
        $(".Icon").addClass("wi-rain").addClass("animated pulse");
        break;
      case 'snow':
        $(".Icon").addClass("wi-snow").addClass("animated pulse");
        break;
      case 'clear':
        $(".Icon").addClass("wi-day-sunny").addClass("animated pulse");
        break;
      case 'thunderstorm':
        $(".Icon").addClass("wi-thunderstorm").addClass("animated pulse");
        break;
      case 'haze':
        $(".Icon").addClass("wi-fog").addClass("animated pulse");
        break;
      default:
        $('.Icon').addClass("wi-na").addClass("animated pulse");
      }

  })

  console.log("latlon: " + latlon);
  console.log("URL: " + URL);



}
