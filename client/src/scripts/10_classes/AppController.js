var $, AppRouter, BaseControllers, BasePage, BaseViews, Handlebars, HomePage, MarionetteExtensions, _, swag;

AppRouter = require("10_classes/AppRouter");
MarionetteExtensions = require("20_modules/marionetteExtensions");
BaseViews = require("20_modules/viewsModule");
BaseControllers = require("20_modules/controllersModule");
Handlebars = require("hbsfy/runtime");
$ = require("jquery");
_ = require("underscore");
swag = require("swag");

BasePage = require("70_pages/_basePage/basepageApp");
HomePage = require("70_pages/homePage/homepageApp");

module.exports = function(AppController, App) {
  AppController.on("before:start", function() {

    this.$body = $('body');

    App.router = new AppRouter(App);

    App.router.initRouter();

    App.module("MarionetteExtensions", MarionetteExtensions);

    App.module("BaseViews", BaseViews);
    App.module("BaseControllers", BaseControllers);

    //Register Handlebar Helpers
    HandlebarsHelpers = require("01_config/handlebars/helpers")(App);

    for (key in HandlebarsHelpers) {
      if (!hasProp.call(HandlebarsHelpers, key)) continue;
      fn = HandlebarsHelpers[key];
      Handlebars.registerHelper(key, fn);
    }

    window.Swag.registerHelpers(Handlebars);

    App.addRegions({
      regionMain: '.region-main'
    });

    App.module("HomePage", BasePage.definition);
    App.module("HomePage", HomePage, {
      path: "HomePage"
    });

    this.startOptions = {
      app: App.HomePage,
      page: 'home',
      params: false
    };

    App.vent.on(App.EVENTS.ROUTEHOME, (function(_this) {
      return function() {
        _this.startOptions.page = 'page-home';
        return _this.startOptions.app = App.HomePage;
      };
    })(this));

    return App.vent.trigger(App.EVENTS.APPCONTROLLERINITALL);
  });


  AppController.on("start", function() {
    return App.request(App.REQUESTS.LOCALE, function(err, locale) {
      if (err) {
        throw new Error('Something went wrong during fetching locale');
      } else {

        App.locale = locale;

        _.extend(App.locale, {
          getKey: function(key) {
            return this[key];
          }
        });

        AppController.setPageClass(AppController.startOptions.page);

        if (!AppController.startOptions.params) {
          return AppController.startOptions.app.start();
        } else {
          return AppController.startOptions.app.start(AppController.startOptions.params);
        }
      }
    });
  });

  return this.setPageClass = function(pageClass) {
    return $('body').addClass(pageClass);
  };
};
