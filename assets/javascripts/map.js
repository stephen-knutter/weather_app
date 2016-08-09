/*MAPBOX WRAPPER*/
(function(namespace){
  namespace.mapkey = 'pk.eyJ1Ijoic21rcXA4IiwiYSI6ImNpcmtuZmh0YjAwMzZmZm04ZjF4ODU4NjQifQ.39jUUHq0jF4BzDD3gfxDOw';
  namespace.createMap = function(lat,lng,map){
    var mapWrap = document.getElementById('map-wrap');
    var childNodes = mapWrap.childNodes.length;
    for(var i=0; i<childNodes; i++){
      if(mapWrap.childNodes[i]){
        mapWrap.removeChild(mapWrap.childNodes[i]);
      }
    }
    var mapAppend = document.createElement('div');
    mapAppend.id = "map";
    mapWrap.appendChild(mapAppend);
    L.mapbox.accessToken = namespace.mapkey;
    var newMap = L.mapbox.map('map', 'mapbox.streets').setView([lat,lng],9);
  },
  namespace.getLocation = function(weather,callback){
    var lat;
    var lng;
    var coords = {};
    if(navigator.geolocation){
      var geolocation = navigator.geolocation.getCurrentPosition(function(position){
        lat = position.coords.latitude;
        coords.lat = lat;
        lng = position.coords.longitude;
        coords.lng = lng;
        if(coords){
          coords.status = 200;
        } else {
          coords.status = 500;
        }
      }, function(err){
        //NAVIGATOR GEOLOCATION ERROR
        coords.status = 500;
      });
      callback(weather,coords);
    }
    return false;
  },
  namespace.geocodeLatLng = function(lat,lng){
  }
})(window.mapping || (window.mapping = {}));
