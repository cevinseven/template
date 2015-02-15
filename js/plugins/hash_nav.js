;(function ($) {

  ////
  // 
  //  **NOTE: INITIAL SETUP** for this plugin to work, the nav and content section must be formatted as below:
  //   NAV: ul.nav > li > a[href="#hash"] | links must be nested in a <li> element with the target hash as the link
  //   CONTENT: ul.hash-content  > li.section-name | this can be div.content > div, or ul > li, but each section needs a class that corresponds to a nav link's hash
  // 
  ////

  $.fn.hashNav = function(options){
    // global values
    if (options === undefined){options = {}}
    var vars = $.extend({}, $.fn.hashNav.defaults, options),
        $nav = $(this),
        $content = $('.'+ vars.contentWrapper);

    //methods
    methods = {
      init: function(){
        methods.bindings();
        methods.hashCheck();
      },
  
      bindings: function (){
        $(window).bind('hashchange', function(){
          methods.hashCheck();
        });
      },

      defaultView: function(){
        $content.find(vars.sectionSelector).hide().removeClass('active').eq(0).show().addClass('active');
        $nav.find('.active').removeClass('active');
        $nav.find('li').eq(0).find('a').addClass('active');
        vars.hash = undefined;
      },

      updateContent: function(hash){

        if (vars.transition === 'fade'){
          $content.find(vars.sectionSelector).fadeOut(vars.fadeDuration).removeClass('active');
          $content.find('.'+hash).fadeIn(vars.fadeDuration).addClass('active');
        }
        else {
          $content.find(vars.sectionSelector).hide().removeClass('active');
          $content.find('.'+hash).show().addClass('active');
        }

        $nav.find('a').removeClass('active');
        $nav.find('a[href*='+hash).addClass('active');
      },

      hashCheck: function(){
        var newHash = window.location.hash.substring(1);

        if (window.location.hash){
          if (newHash !== vars.hash && $('.' + newHash).length) {
            methods.updateContent(newHash);
            vars.hash = newHash; 
          }
          else {
            if (vars.hash === undefined){
              if (vars.homeHash !== undefined){
                window.location.hash = vars.homeHash;
              }
              else {
                methods.defaultView();
              }
            }
          }
        }
        else {
          if (vars.homeHash !== undefined){
            window.location.hash = vars.homeHash;
          }
          else {
            methods.defaultView();
          }
        }
      }
    }

    // initial check
    methods.init();
  };

  // default settings
  $.fn.hashNav.defaults = {
    contentWrapper: 'hash-content',    // String: wrapping element that holds all of the different sections
    sectionSelector: 'li',             // String: the selector for the different hash sections, all hash sections must be wrapped in the same type of selector (<li> / <div> etc)
    homeHash: undefined,               // String: defaults to undefined, this specifies which section to initially display, it also adds a hash to the url automatically.
    transition: 'fade',                // String: sets the transition between sections, set to either "fade" or "none"
    fadeDuration: 300                  // Integer: sets the time it takes to fade-in new content
  }
}(jQuery));