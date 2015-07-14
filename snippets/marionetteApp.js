var [AppName]Controller, [AppName]View;

[AppName]Controller = require("./[appname]Controller");

[AppName]View = require("./[appname]View");

module.exports = function(Module, App, Backbone, Marionette, $, _, options) {
  var API;
  Module.startWithParent = false;
  API = {
    startApp: function() {
      return App.module(options.path + ".Show").Controller.startView();
    }
  };
  Module.on('before:start', function() {
    App.module(options.path + ".Show", [AppName]Controller, options);
    return App.module(options.path + ".Show", [AppName]View);
  });
  Module.on('start', function() {
    return API.startApp();
  });
  Module.on('before:stop', function() {
    return API.closeView();
  });
  return Module.on('stop', function() {});
};