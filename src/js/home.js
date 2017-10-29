window.$ = jQuery;

let Home = {

    settings: {
        // numArticles: 5,
        // articleList: $("#article-list"),
        // moreButton: $("#more-button")
    },

    init: function($) {
        // kick things off
        console.log('hello world');
        console.log($);
        // var h1CSS = $('h1').css();
        // console.log(h1CSS);
    }

};
(function($){
  Home.init($);
}());
 export default Home;