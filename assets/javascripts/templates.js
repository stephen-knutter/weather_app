(function(namespace){
  namespace.addCarousel = function(){
    return '<div id="carousel-container" class="container col-lg-12 col-md-12 col-sm-12">'+
                    '<div id="myCarousel" class="carousel slide" data-ride="carousel">'+
                      '<ol class="carousel-indicators">'+
                        '<li data-target="#myCarousel" data-slide-to="0" class="active"></li>'+
                        '<li data-target="#myCarousel" data-slide-to="1"></li>'+
                        '<li data-target="#myCarousel" data-slide-to="2"></li>'+
                        '<li data-target="#myCarousel" data-slide-to="3"></li>'+
                      '</ol>'+
                      '<div class="carousel-inner" role="listbox">'+
                      '</div>'+
                      '<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">'+
                        '<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>'+
                        '<span class="sr-only">Previous</span>'+
                      '</a>'+
                      '<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">'+
                        '<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>'+
                        '<span class="sr-only">Next</span>'+
                      '</a>'+
                    '</div>'+
                  '</div>'
  };
  namespace.addForecast = function(i,month,day,year,high,low,icon,tz,windDir,windMph,text){
    return'<td>'+
            '<div class="forecast-head">'+
              '<h6>'+month+' '+day+', '+year+'</h6>'+
              '<span  class="temp-high" id="high-'+i+'">'+high+' H</span> | <span class="temp-low" id="low-'+i+'">'+low+' L</span>'+
              '</div>'+
            '<div class="forecast-body">'+
              '<img src="'+icon+'" alt="'+tz+'">'+
            '</div>'+
            '<div class="forecast-foot">Winds from '+windDir+' at '+windMph+ ' '+text+'</div>'+
          '</td>'
  };
})(window.templates || (window.templates = {}))
