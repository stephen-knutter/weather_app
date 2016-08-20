$(function(){
  var weather = {
    curCity: 'San_Francisco',
    curState: 'CA',
    options: $(".side-btn"),
    tables: $(".table"),
    toggle: $("#toggle-btn"),
    state: $("#state"),
    city: $("#city"),
    spinner: $("#spinner"),
    submit: $("#submit"),
    form: $("#search_form"),
    mainHeader: $("#header"),
    timeHeader: $("#time-header"),
    conditions: $("#side-conditions"),
    forecastTable: $("#forecast"),
    forecastInfo: $("#forecast-info"),
    camTable: $("#cams"),
    camImg: $("#cam-img"),
    infoTable: $("#info"),
    innerCarousel: $("#inner-carousel"),
    templateConditions: $("#conditions"),
    templateCurrentTime: $("#current-time"),
    templateHeader: $("#template-header"),
    templateInfo: $("#template-info"),
    templateForecast: $("#template-forecast"),
    templateWebcams: $("#template-webcams"),
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
      this.hideTables();
      this.showSpinner();
      mapping.getLocation(this, this._mapcallback);
    },
    _mapcallback: function(oThis,data){
      oThis.hideSpinner();
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
            var response = data.response;
            var error = response.error;
            if(error){
              alert('Could not find data for ' + city + ' ,' + state);
            }
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
            var request = $(".bg-primary").find("a").data("req");
            $this.showTable(request);
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
      var icon = items.icon_url,
          alt = items.display_location.city+', '+items.display_location.state+' Weather',
          description = items.weather,
          temp = items.temperature_string,
          feels = items.feelslike_string,
          wind = "From the "+items.wind_dir+" "+items.wind_mph+" MPH",
          lat = items.observation_location.latitude,
          lng = items.observation_location.longitude,
          exlink = items.forecast_url,
          full_location = items.display_location.full,
          local_time = items.local_time_rfc822,
          city = items.display_location.city,
          state = items.display_location.state,
          zip = items.display_location.zip,
          observation_time = items.observation_time,
          full_description = items.observation_location.full,
          duepoint = items.dewpoint_string,
          windchill = items.windchill_string,
          precipitation = items.precip_today_string,
          humidity = items.relative_humidity,
          elevation = items.observation_location.elevation;
      //HEADER INFO
      var headerInfo = [{location: full_location, zip: zip, observation_time: observation_time}];
      var headerTemplate = this.templateHeader.html();
      var Template = Handlebars.compile(headerTemplate);
      this.mainHeader.html("");
      this.mainHeader.append(Template(headerInfo));
      //CURRENT TIME
      var currentTime = [{time: local_time}];
      var currentTimeTemplate = this.templateCurrentTime.html();
      var Template = Handlebars.compile(currentTimeTemplate);
      this.timeHeader.html("");
      this.timeHeader.append(Template(currentTime));
      //CONDTIONS INFO(LEFT SIDE)
      var sideConditions = [{icon: icon, alt: alt, description: description, temp: temp, feels: feels, wind: wind, lat: lat, lng: lng, exlink: exlink, full_location: full_location}];
      var conditionsTemplate = this.templateConditions.html();
      var Template = Handlebars.compile(conditionsTemplate);
      this.conditions.html("");
      this.conditions.append(Template(sideConditions));
      //TABLE INFO(RIGHT SIDE -  BODY)
      var curInfoData = [{full_description: full_description, temp: temp, duepoint: duepoint, windchill: windchill, precipitation: precipitation, humidity: humidity, elevation: elevation}];
      var infoTemplate = this.templateInfo.html();
      var Template = Handlebars.compile(infoTemplate);
      this.infoTable.html("");
      this.infoTable.append(Template(curInfoData));

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
            var webcams = data.webcams;
            for(var i=0; i<10; i++){
              $this.webcams[i] = webcams[i];
            }
            $this.addCarousel($this.webcams);
          }
        }
      })
    },
    addCarousel: function(webcams){
      var webcamItems = [];
      for(var i in webcams){
        var className = 'item';
        if(i==0){
          className += ' active';
        }
        var current = webcams[i];
        var items = {
          image: current.CURRENTIMAGEURL,
          city: current.city,
          class_name: className
        };
        webcamItems.push(items);
      }
      var webcamsTemplate = this.templateWebcams.html();
      var Template = Handlebars.compile(webcamsTemplate);
      this.camImg.html("");
      this.camImg.append(Template(webcamItems));
      //carousel.append('<div class="'+className+'"><img src="'+item.CURRENTIMAGEURL+'" alt="'+item.city+' Webcams"></div>')
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
    addForecast: function(forecasts){
      var forecastItems = [];
      for(i in forecasts){
        var current = forecasts[i];
        var items  = {
          index: i,
          conditions: current.conditions,
          tz: current.date.tz_long,
          month: current.date.monthname,
          day: current.date.day,
          year: current.date.year,
          high: current.high.fahrenheit,
          low: current.low.fahrenheit,
          icon: current.icon_url,
          wind_dir: current.avewind.dir,
          wind_mph: current.avewind.mph,
          text: current.txt.fcttext
        };
        forecastItems.push(items);
      }
      var forecastTemplate = this.templateForecast.html();
      var Template = Handlebars.compile(forecastTemplate);
      this.forecastInfo.html("");
      this.forecastInfo.append(Template(forecastItems));
    },
    buttonToggle: function(oThis){
      this.options.removeClass('bg-primary');
      oThis.addClass('bg-primary');
    },
    clearTables: function(){
      this.camImg.html("");
      this.forecastInfo.html("");
    },
    hideTables: function(){
      this.tables.css("display", "none");
    },
    showTable: function(request){
      switch(request){
        case 'forecast':
          this.showForecast();
        break;
        case 'cams':
          this.showCams();
        break;
        case 'info':
          this.showInfo();
        break;
      }
    },
    showSpinner: function(){
      this.spinner.css("display", "block");
    },
    hideSpinner: function(){
      this.spinner.css("display", "none");
    },
    showForecast: function(){
      this.forecastTable.css("display", "table");
    },
    showCams: function(){
      this.camTable.css("display", "table");
    },
    showInfo: function(){
      this.infoTable.css("display", "table");
    },
    displayTables: function(oThis){
      var link = oThis.find('a');
      var request = link.data('req');
      this.hideTables();
      this.showTable(request);
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
