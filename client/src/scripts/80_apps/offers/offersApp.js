var OffersController = require("./offersController");
var OffersViev = require("./offersView");

module.exports = function(Module, App, Backbone, Marionette, $, _, options) {

  var API;

  Module.startWithParent = false;
  API = {
    startApp: function(collection) {
      App.module(options.path + ".Show").Controller.startView(collection);
    }
  };

  Module.on('before:start', function() {
    //we pass our options object to Controller
    App.module(options.path + ".Show", OffersController, options);
    App.module(options.path + ".Show", OffersViev);
  });

  Module.on('start', function(collection) {
    API.startApp(collection);
  });

  Module.on('before:stop', function() {

  });

  Module.on('stop', function() {

  });
};
