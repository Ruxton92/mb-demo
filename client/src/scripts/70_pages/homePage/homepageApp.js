var HomePageController = require("./homepageController");
var HomePageView = require("./homepageView");

//submodules
var HelloWorldApp = require('80_apps/helloWorld/helloworldApp');
var HelloWorldWithDataFetchingApp = require('80_apps/HelloWorldWithDataFetching/helloworldwithdatafetchingApp');

module.exports = function(Module, App, Backbone, Marionette, $, _, options) {

  var API;

  Module.startWithParent = false;

  API = {
    startApp: function() {
      var _controller;

      _controller = App.module(options.path + ".Show").Controller;
      _controller.startView();

      //it's important that the path is set in correct way, the hireacrchical structure of module -> module is important
      //to stop all submodules if the parent module will be stopped
      //our default layoutViewController has the methof getRegion which returns with the named region (if exists).
      //see /client/src/scripts/65_controllers/_base/layoutViewController.js

      App.module(options.path + ".HelloWorldApp", HelloWorldApp, {path: options.path + ".HelloWorldApp", region: _controller.getRegion('regionContent')});
      App.module(options.path + ".HelloWorldWithDataFetchingApp", HelloWorldWithDataFetchingApp, {path: options.path + ".HelloWorldWithDataFetchingApp", region: _controller.getRegion('regionContent')});

      //start hello world app
      App.module(options.path + ".HelloWorldApp").start();
      App.module(options.path + ".HelloWorldWithDataFetchingApp").start();

    }
  };

  Module.on('before:start', function() {
    //Add Submodule Show which contains Controller and View of App
    App.module(options.path + ".Show", HomePageController, options);
    App.module(options.path + ".Show", HomePageView);

  });

  Module.on('start', function() {
    API.startApp();
  });

  Module.on('before:stop', function() {

  });

  Module.on('stop', function() {});
};
