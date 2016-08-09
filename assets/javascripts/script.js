$(function(){
  var weather = {
    curCity: 'San_Francisco',
    curState: 'CA',
    options: $(".side-btn"),
    tables: $(".table"),
    toggle: $("#toggle-btn"),
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
    forecastTable: $("#forecast"),
    forecastInfo: $("#forecast-info"),
    camTable: $("#cams"),
    camImg: $("#cam-img"),
    infoTable: $("#info"),
    fullDescrip: $("#fullDescrip"),
    tempDescrip: $("#tempDescrip"),
    windDescrip: $("#windDescrip"),
    dueDescrip: $("#dueDescrip"),
    chillDescrip: $("#chillDescrip"),
    stationDescrip: $("#stationDescrip"),
    rainDescrip: $("#rainDescrip"),
    humidDescrip: $("#humidDescrip"),
    elevDescrip: $("#elevDescrip"),
    curWeather: {},
    userLoc: {},
    geoData: {},
    webcams: {},
    forecasts: {},
    reverseGeocode: function(data){
      $this = this;
      var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+data.lng+','+data.lat+'.json?access_token='+mapping.mapkey;
      $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
          $this.geoData = data.features;
          var city = $this.geoData[0].context[1].text;
          city = $this.formatCity(city);
          var state = $this.geoData[0].context[3].short_code;
          state = $this.formatState(state);
          if(state && city){
            $this.getData(state,city);
          } else {
            $this.getData($this.curState, $this.curCity);
          }
        }
      })
    },
    getLoc: function(){
      mapping.getLocation(this, this._mapcallback);
    },
    _mapcallback: function(oThis,data){
      var status = data.status;
      if(status === 200){
        oThis.userLoc = data;
        oThis.reverseGeocode(data);
      } else {
        oThis.getData(oThis.curState, oThis.curCity);
      }
    },
    getData: function(state,city){
      var $this = this;
      var url = 'https://api.wunderground.com/api/748045a663ebb010/conditions/q/'+state+'/'+city+'.json';
      $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
          if(data){
            $this.curState = state;
            $this.curCity = city;
            $this.curWeather = data.current_observation;
            if($this.curWeather){
              $this.appendItems($this.curWeather);
            }
            $this.forecastInfo.html("");
            $this.getForecast();
            $this.camImg.html("");
            $this.getCams();
            $this.checkMobileToggle();
          } else {
            alert('Could not find data for ' + city + ' ,' + state);
          }
        }
      })
    },
    checkMobileToggle: function(){
      var docWidth = resize.docWidth;
      if(docWidth <= 786){
        this.toggle.click();
      }
    },
    appendItems: function(items){
      //HEAD
      this.headLoc.html(items.display_location.full);
      this.headZip.html('('+items.display_location.zip+')');
      this.updated.html(items.observation_time);
      //BODY
      this.time.html(items.local_time_rfc822);
      this.icon.attr({'src': items.icon_url, 'alt': items.display_location.city+' , '+items.display_location.state+' Weather'});
      this.description.html(items.weather);
      this.temp.html(items.temperature_string);
      this.feels.html(items.feelslike_string);
      this.wind.html("From the "+items.wind_dir+" "+items.wind_mph+" MPH");
      this.lat.html(items.observation_location.latitude);
      this.lng.html(items.observation_location.longitude);
      this.exlink.attr('href', items.forecast_url).html(items.display_location.full);
      this.fullDescrip.html(items.observation_location.full);
      this.dueDescrip.html(items.dewpoint_string);
      this.windDescrip.html(items.windchill_string);
      this.stationDescrip.html(items.station_id);
      this.rainDescrip.html(items.precip_today_string);
      this.humidDescrip.html(items.relative_humidity);
      this.elevDescrip.html(items.observation_location.elevation);
      mapping.createMap(items.observation_location.latitude,items.observation_location.longitude);
    },
    formatState: function(state){
      state = state.toUpperCase().replace(/US\-/g, "").replace(/^[A-Z]$/gi, "");
      return state;
    },
    formatCity: function(city){
      city = city.replace(/\s+/g, "_").replace(/^[a-zA-Z]$/gi, "_");
      return city;
    },
    getCams: function(){
      $this = this;
      var url = 'https://api.wunderground.com/api/748045a663ebb010/webcams/q/'+this.curState+'/'+this.curCity+'.json';
      $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
          if(data){
            $this.addCarousel();
            var webcams = data.webcams;
            for(var i=0; i<10; i++){
              $this.webcams[i] = webcams[i];
              $this.addCarouselItem($this.webcams[i],i);
            }
          }
        }
      })
    },
    addCarouselItem: function(item,i){
      var carousel = $this.camImg.find("div.carousel-inner");
      var className;
      if(i===0){
        className = 'item active';
      } else {
        className = 'item';
      }
      carousel.append('<div class="'+className+'"><img src="'+item.CURRENTIMAGEURL+'" alt="'+item.city+' Webcams"></div>')
    },
    addCarousel: function(){
      var carousel = templates.addCarousel;
      this.camImg.html(carousel);
    },
    getForecast: function(){
      $this = this;
      var url = 'https://api.wunderground.com/api/748045a663ebb010/forecast10day/q/'+this.curState+'/'+this.curCity+'.json';
      $.ajax({
        type: 'GET',
        url: url,
        success: function(data){
          var forecast = data.forecast.simpleforecast.forecastday;
          var txt = data.forecast.txt_forecast.forecastday;
          for(var i=0; i<3; i++){
            $this.forecasts[i] = forecast[i];
            $this.forecasts[i].txt = txt[i];
          }
          $this.addForecast($this.forecasts);
        }
      })
    },
    addForecast(forecasts){
      for(i in forecasts){
        var current = forecasts[i];
        var conditions = current.conditions;
        var tz = current.date.tz_long;
        var month = current.date.monthname;
        var day = current.date.day
        var year = current.date.year;
        var high = current.high.fahrenheit;
        var low = current.low.fahrenheit;
        var icon = current.icon_url;
        var windDir = current.avewind.dir;
        var windMph = current.avewind.mph;
        var text = current.txt.fcttext;
        this.forecastInfo.append(templates.addForecast(i,month,day,year,high,low,icon,tz,windDir,windMph,text));
      }
    },
    buttonToggle: function(oThis){
      this.options.removeClass('bg-primary');
      oThis.addClass('bg-primary');
    },
    clearTables: function(){
      this.camImg.html("");
      this.forecastInfo.html("");
    },
    displayTables: function(oThis){
      var link = oThis.find('a');
      var request = link.data('req');
      this.tables.css("display","none");
      switch(request){
        case 'forecast':
          this.forecastTable.css("display","table");
        break;
        case 'cams':
          this.camTable.css("display","table");
        break;
        case 'info':
          this.infoTable.css("display","table");
        break;
      }
    }
  };

  weather.form.on("submit", function(event){
    event.preventDefault();
    var state = weather.state.val();
    state = weather.formatState(state);
    var city = weather.city.val();
    city = weather.formatCity(city);
    if(state && city){
      weather.clearTables();
      weather.getData(state,city);
    }
  });

  weather.options.on("click", function(){
    weather.buttonToggle($(this));
    weather.displayTables($(this));
  });
  
  weather.getLoc();
});
