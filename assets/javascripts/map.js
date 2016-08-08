/*MAPBOX WRAPPER*/
(function(namespace){
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
    L.mapbox.accessToken = 'pk.eyJ1Ijoic21rcXA4IiwiYSI6ImNpcmtuZmh0YjAwMzZmZm04ZjF4ODU4NjQifQ.39jUUHq0jF4BzDD3gfxDOw';
    var newMap = L.mapbox.map('map', 'mapbox.streets').setView([lat,lng],9);
  },
  namespace.getLocation = function(){
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
          return coords;
        } else {
          return false;
        }
      });
    }
    return false;
  }
})(window.mapping || (window.mapping = {}));
