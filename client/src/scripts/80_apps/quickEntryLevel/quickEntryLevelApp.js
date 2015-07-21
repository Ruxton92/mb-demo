var QuickEntryLevelController = require("./quickEntryLevelController");
var QuickEntryLevelViev = require("./quickEntryLevelView");

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
    App.module(options.path + ".Show", QuickEntryLevelController, options);
    App.module(options.path + ".Show", QuickEntryLevelViev);
  });

  Module.on('start', function() {
    API.startApp();
  });

  Module.on('before:stop', function() {

  });

  Module.on('stop', function() {

  });
};
