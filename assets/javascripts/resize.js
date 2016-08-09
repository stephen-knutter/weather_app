$(function(){
  var resize = {
    docHeight: null,
    docWidth: null,
    body: $("#fixed-body"),
    td: $("#forecast-info td"),
    getHeight: function(){
      this.docHeight = document.documentElement.clientHeight;
    },
    getWidth: function(){
      this.docWidth = document.documentElement.clientWidth;
    },
    init: function(){
      this.getHeight();
      this.getWidth();
      this.checkHeight();
    },
    checkHeight: function(){
      if(this.docWidth > 1200){
        var bodyHeight = this.docHeight - 240 + "px";
        this.body.css("height", bodyHeight);
        var tdHeight = bodyHeight - 100 + "px";
        this.td.css("height", tdHeight);
      } else {
        this.body.css("height", "auto");
        this.td.css("height", "auto");
      }
    }
  }
  $(window).on("load", function(){
    resize.init();
  });
  $(window).on("resize", function(){
    resize.init();
  });
});
