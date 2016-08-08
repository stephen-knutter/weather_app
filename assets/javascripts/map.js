$(function(){
  //MAPBOX MAP
  L.mapbox.accessToken = 'pk.eyJ1Ijoic21rcXA4IiwiYSI6ImNpcmtuZmh0YjAwMzZmZm04ZjF4ODU4NjQifQ.39jUUHq0jF4BzDD3gfxDOw';
  var newMap = L.mapbox.map('map', 'mapbox.streets').setView([37.778488, -122.408005], 11)
})

(function(namespace){
  namespace.createMap = function(lat,lng,map){
    
  }
})(window.mapping || window.mapping = {});
