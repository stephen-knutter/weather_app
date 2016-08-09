$(function(){
  var resize = (function(namespace){
      namespace.docHeight = null;
      namespace.docWidth = null;
      namespace.body = $("#fixed-body");
      namespace.td = $("#forecast-info td");
      namespace.getHeight = function(){
        this.docHeight = document.documentElement.clientHeight;
      };
      namespace.getWidth = function(){
        this.docWidth = document.documentElement.clientWidth;
      };
      namespace.init = function(){
        this.getHeight();
        this.getWidth();
        this.checkHeight();
      };
      namespace.checkHeight = function(){
        if(this.docWidth > 1200){
          var bodyHeight = this.docHeight - 240 + "px";
          this.body.css("height", bodyHeight);
          var tdHeight = bodyHeight - 100 + "px";
          this.td.css("height", tdHeight);
        } else {
          this.body.css("height", "auto");
          this.td.css("height", "auto");
        }
      };

  })(window.resize || (window.resize = {}));

  $(window).on("load", function(){
    window.resize.init();
  });
  $(window).on("resize", function(){
    window.resize.init();
  });
});
