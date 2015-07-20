/*
Default Behavior of all page modules (home/offer/catalogue)
it should define the base layout view with it's regions
it should load all common modules

- main navigaion (model navigation on top)
 */

var basePageController = require("./basePageController");
var basePageView = require("./basePageView");
var HeaderApp = require('80_apps/header/headerApp');
var FooterApp = require('80_apps/footer/footerApp');

module.exports = {
  definition: function(Module, App, Backbone, Marionette, $, _) {
    Module.startWithParent = false;

    var API;

    API = {
      startApp: function() {
        var _controller;
        _controller = App.module("Show").Controller;
        _controller.startView();

        //it's important that the path is set in correct way, the hireacrchical structure of module -> module is important
        //to stop all submodules if the parent module will be stopped
        //our default layoutViewController has the methof getRegion which returns with the named region (if exists).
        //see /client/src/scripts/65_controllers/_base/layoutViewController.js

        App.module('HeaderApp', HeaderApp, {path: 'HeaderApp', region: _controller.getRegion('regionHeader')});
        App.module('HeaderApp', FooterApp, {path: 'FooterApp', region: _controller.getRegion('regionFooter')});

        App.module("HeaderApp").start();
        App.module("FooterApp").start();

      }
    };

    Module.on('before:start', function() {
      App.module("Show", basePageController);
      App.module("Show", basePageView);
    });
    return Module.on('start', function() {
      API.startApp();
    });
  }
};
