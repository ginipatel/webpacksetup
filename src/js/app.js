// import "../bower_components/bootstrap-sass/assets/stylesheets/_bootstrap.scss";
// require("../libraries/w3");
import "../scss/index.scss";

(function () {
    w3.includeHTML();
    let Home = {
        settings: {
            title: 'Home page'
        },
        onChangeEvents:function () {
            $('select').on('change', function () {
                console.log($(this).val());
            })
        },
        onClickEvents:function(){
        },
        init: function () {
            let s = this.settings;
            console.log(s.title);
            this.onChangeEvents();
            this.onClickEvents();
        }
    };

    let AboutUs = {
        settings: {
            title: 'About us page'
        },
        init: function () {
            let s = this.settings;
            console.log(s.title);
        }
    };

    Home.init();
    AboutUs.init();

}());