<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="A bootstrap weather application">
    <meta name="keywords" content="bootstrap, jQuery, html5, css3, mapbox, weatherunderground">
    <title>Stephen's Weather Forcast</title>
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet" integrity="sha384-T8Gy5hrqNKT+hzMclPo118YTQO6cYprQmhrYwIiQ/3axmI1hQomh7Ud2hPOy8SP1" crossorigin="anonymous">
    <link href='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.css' rel='stylesheet' />
    <link rel="stylesheet" type="text/css" href="./assets/styles/styles.css" >
    <script   src="https://code.jquery.com/jquery-3.1.0.min.js"   integrity="sha256-cCueBR6CsyA4/9szpPfrX3s49M9vUU5BgtiJj06wt/s="   crossorigin="anonymous"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
    <script src='https://api.mapbox.com/mapbox.js/v2.4.0/mapbox.js'></script>
    <script type="text/javascript" src="./assets/javascripts/map.js"></script>
    <script type="text/javascript" src="./assets/javascripts/script.js"></script>
  </head>
  <body>
    <nav class="navbar navbar-inverse navbar-fixed-top">
      <div class="navbar-header">
        <a class="navbar-brand" href="#"><i class="fa fa-bolt" aria-hidden="true"></i> Weather API</a>
      </div>
      <form class="navbar-form pull-right" id="search_form">
        <input class="form-control" id="city" type="text" name="city" placeholder="City..." />
        <input class="form-control" id="state" type="text" name="state" placeholder="State..." maxlength=2 />
        <button type="submit" id="submit" class="btn btn-primary">Get Weather</button>
      </form>
    </nav>
      <div class="container page-header">
        <header>
          <h1 class="pull-left"><span id="head-loc">San Francisco, CA</span><span id="head-zip">(94101)</span></h1><span class="update" id="last-updated">Last Updated on August 6, 8:14 PM PDT</span>
        </header>
      </div>

      <main class="container container-fluid">
        <div class="col-lg-3 col-md-12 col-sm-12">
          <div class="well options">
            <span class="upper-head">OPTIONS</span>
            <p class="bg-primary side-btn"><a href="#">Weather</a></p>
            <p class="side-btn"><a href="#">Radar</a></p>
          </div>
          <div id="map">
          </div>
        </div>
        <div class="">
          <div class="col-lg-9 col-md-12 col-sm-12">
            <div class="well">
              <div class="header">
                <span class="time"> <i class="fa fa-clock-o" aria-hidden="true"></i> <span id="time">Sat, 06 Aug 2016 20:14:27 -0700</span></span><h1 class="h1-no-padding">Current Conditions</h1>
              </div>
              <div class="row">
                <div class="col-lg-4 col-md-12 col-sm-12">
                  <div class="img-wrap-50">
                    <img id="weather-icon" src="http://icons.wxug.com/i/c/k/partlycloudy.gif" alt="San Francisco, CA Weather" />
                    <strong id="weather-descrip" class="grey-bold">Mostly Cloudy</strong>
                  </div>
                  <p class="temp" id="temp">52 F (11 C)</p>
                  <p class="feels-like">
                    <span class="grey-bold"> <i class="fa fa-sun-o" aria-hidden="true"></i> Feels Like: <span id="feels-like">56.8 F (13.8 C)</span></span>
                  </p>
                  <p class="wind">
                    <span class="grey-bold"> <i class="fa fa-globe" aria-hidden="true"></i> Wind: <span id="wind">From the SW 6.0 MPH</span></span>
                  </p>
                  <p class="lat">
                    <span class="grey-bold"> <i class="fa fa-arrow-circle-o-right" aria-hidden="true"></i> Latitude: <span id="lat">37.778488</span></span>
                  </p>
                  <p class="lng">
                    <span class="grey-bold"> <i class="fa fa-arrow-circle-o-up" aria-hidden="true"></i> Longitude: <span id="lng">-122.408005</span></span>
                  </p>
                  <p class="link">
                    <span class="source"><i class="fa fa-external-link" aria-hidden="true"></i> <a id="external-link" target="_blank" href="http://www.wunderground.com/US/CA/San_Francisco.html">San Francisco, California</a></span>
                  </p>
                </div>
                <div class="col-lg-8 table-div content-div">
                  <table class="table table-content">
                    <thead>
                    </thead>
                    <tbody>
                      <tr class="temp-tr">
                        <td>Full</td>
                        <td id="fullDescrip">SOMA, San Francisco, California</td>
                      </tr>
                      <tr class="temp-tr">
                        <td>Temperature</td>
                        <td id="tempDescrip">52 F (11 C)</td>
                      </tr>
                      <tr class="temp-tr">
                        <td>Wind</td>
                        <td id="windDescrip">From the SW 11.0 MPH</td>
                      </tr>
                      <tr class="temp-tr">
                        <td>Duepoint</td>
                        <td id="dueDescrip">52 F (11 C)</td>
                      </tr>
                      <tr class="temp-tr">
                        <td>Windchill</td>
                        <td id="chillDescrip">N/A</td>
                      </tr>
                      <tr class="temp-tr">
                        <td>Station ID</td>
                        <td id="stationDescrip">KCASANFR131</td>
                      </tr>
                      <tr class="temp-tr">
                        <td>Precip Today</td>
                        <td id="rainDescrip">0.00 in (0 mm)</td>
                      </tr>
                      <tr class="temp-tr">
                        <td>Rel Humity</td>
                        <td id="humidDescrip">85%</td>
                      </tr>
                      <tr class="temp-tr">
                        <td>Elevation</td>
                        <td id="elevDescrip">23 ft</td>
                      </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer class="footer">
        <div class="container">
          <p class="pull-right">Powered By: <a target="_blank" href="http://www.wunderground.com"> Weather Underground </a><img class="img-50x50" src="http://icons.wxug.com/graphics/wu2/logo_130x80.png" alt="weather underground" /></p>
        </div>
      </footer>
  </body>
</html>
