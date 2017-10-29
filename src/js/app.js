import "../bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";
import "../scss/index.scss";

(function(){
  let Home = {
      settings :{
          title:'Home page'
      },
      init:function () {
        let s= this.settings;
        console.log($);
        console.log(s.title);
      }
  };

  Home.init();
}());