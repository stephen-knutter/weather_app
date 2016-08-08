$(function(){
  var weather = {
    state: $("#state"),
    city: $("#city"),
    submit: $("#submit"),
    form: $("#search_form"),
    headLoc: $("#head-loc"),
    headZip: $("#head-zip"),
    updated: $("#last-updated"),
    time: $("#time"),
    icon: $("#weather-icon"),
    description: $("#weather-descrip"),
    temp: $("#temp"),
    feels: $("#feels-like"),
    wind: $("#wind"),
    lat: $("#lat"),
    lng: $("#lng"),
    exlink: $("#external-link"),
    fullDescrip: $("#fullDescrip"),
    tempDescrip: $("#tempDescrip"),
    windDescrip: $("#windDescrip"),
    dueDescrip: $("#dueDescrip"),
    chillDescrip: $("#chillDescrip"),
    stationDescrip: $("#stationDescrip"),
    rainDescrip: $("#rainDescrip"),
    humidDescrip: $("#humidDescrip"),
    elevDescrip: $("#elevDescrip"),
    userLoc: null
  }

  weather.form.on("submit", function(event){
    event.preventDefault();
    var state = weather.state.val();
    state = state.toUpperCase().replace(/^[A-Z]$/gi, "");
    var city = weather.city.val();
    city = city.replace(/\s+/g, "_").replace(/^[a-zA-Z]$/gi, "_");
    if(state && city){
      var url = 'http://api.wunderground.com/api/748045a663ebb010/conditions/q/'+state+'/'+city+'.json';
      $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
          if(data){
            //CONTENT OBJECTS
            var W = data.current_observation;
            var displayLoc = W.display_location;
            var observLoc = W.observation_location;
            //HEADER INFO
            var full = displayLoc.full;
            var zip = displayLoc.zip;
            var lastUpdated = W.observation_time;
            //BODY INFO
            var time = W.local_time_rfc822;
            var city = displayLoc.city;
            var state = displayLoc.state;
            var alt = city+' , '+state+' Weather';
            var icon = W.icon_url;
            var description = W.weather;
            var temp = W.temperature_string;
            var feels = W.feelslike_string;
            var windDir = W.wind_dir;
            var windMph = W.wind_mph;
            var wind = "From the "+windDir+" "+windMph+" MPH";
            var lat = observLoc.latitude;
            var lng = observLoc.longitude;
            var exlink = W.forecast_url;
            var fullOther = observLoc.full;
            var duepoint = W.dewpoint_string;
            var windchill = W.windchill_string;
            var stationid = W.station_id;
            var precip = W.precip_today_string;
            var humidity = W.relative_humidity;
            var elevation = observLoc.elevation;
            //APPEND ITEMS
            //HEAD
            weather.headLoc.html(full);
            weather.headZip.html('('+zip+')');
            weather.updated.html(lastUpdated);
            //BODY
            weather.time.html(time);
            weather.icon.attr({'src': icon, 'alt': alt});
            weather.description.html(description);
            weather.temp.html(temp);
            weather.feels.html(feels);
            weather.wind.html(wind);
            weather.lat.html(lat);
            weather.lng.html(lng);
            weather.exlink.attr('href', exlink).html(full);
            weather.fullDescrip.html(fullOther);
            weather.dueDescrip.html(duepoint);
            weather.windDescrip.html(windchill);
            weather.stationDescrip.html(stationid);
            weather.rainDescrip.html(precip);
            weather.humidDescrip.html(humidity);
            weather.elevDescrip.html(elevation);
            mapping.createMap(lat,lng);
          } else {
            alert('Could not find data for ' + city + ' ,' + state);
          }
        }
      })
    }
  })

  weather.userLoc = mapping.getLocation();
  if(weather.userLoc){
    var lat = weather.userLoc.lat;
    var lng = weather.userLoc.lng;
  } else {
    //DEFAULT TO COLORADO
    var lat = '37.778488';
    var lng = '-122.408005';
  }
  mapping.createMap(lat,lng);
})
