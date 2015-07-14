var HomePageController, HomePageView;

HomePageController = require("./homepageController");
HomePageView = require("./homepageView");

module.exports = function(Module, App, Backbone, Marionette, $, _, options) {
  var API;
  Module.startWithParent = false;
  API = {
    startApp: function() {
      var _controller;
      _controller = App.module(options.path + ".Show").Controller;
      return _controller.startView();
    }
  };
  Module.on('before:start', function() {
    App.module(options.path + ".Show", HomePageController, options);
    return App.module(options.path + ".Show", HomePageView);
  });
  Module.on('start', function() {
    return API.startApp();
  });
  Module.on('before:stop', function() {});
  return Module.on('stop', function() {});
};
