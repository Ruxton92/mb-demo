var HeaderController, HeaderView;

HeaderController = require("./headerController");
HeaderView       = require("./headerView");

module.exports = function(Module, App, Backbone, Marionette, $, _, options) {

  var API;

  Module.startWithParent = false;

  API = {
    startApp: function() {
      App.module(options.path + ".Show").Controller.startView();
    }
  };

  Module.on('before:start', function() {
    //we pass our options object to Controller
    App.module(options.path + ".Show", HeaderController, options);
    App.module(options.path + ".Show", HeaderView);
  });

  Module.on('start', function() {
    console.log('headerStart');
    API.startApp();
  });

  Module.on('before:stop', function() {

  });

  Module.on('stop', function() {

  });
};
