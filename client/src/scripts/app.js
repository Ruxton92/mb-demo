var $, App, AppController, Backbone, ERRORS, EVENTS, EntityLoader, Marionette, REQUESTS, config, jqueryForm, jqueryIsinview, jqueryValidate;

$ = require('jquery');

window.$ = $;
window.jQuery = $;

jqueryIsinview = require("jquery.isinview/dist/jquery.isinview");
jqueryForm = require("jquery-form/jquery.form");
jqueryValidate = require("jquery-validation/dist/jquery.validate");

Backbone = require('backbone');
Backbone.$ = $;
Marionette = require('backbone.marionette');

ERRORS = require("00_consts/Errors");
EVENTS = require("00_consts/Events");
REQUESTS = require("00_consts/Requests");

EntityLoader = require("20_modules/entityLoader");
AppController = require("10_classes/AppController");

require("02_prototypes/Array");

config = require("01_config/client_config");

module.exports = App = (function() {
  function App() {}

  App.prototype.start = function() {
    App = new Marionette.Application();
    App.EVENTS = EVENTS;
    App.REQUESTS = REQUESTS;
    App.ERRORS = ERRORS;
    App.module("EntityLoader", EntityLoader);
    App.module("AppController", AppController);
    App.on("start", function() {
      if (Backbone.history) {
        Backbone.history.start({
          pushState: true,
          root: "/"
        });
        Backbone.history.on("route", function(router, name) {});
      }
      App.vent.trigger("APP:START");
      return $(document).on('wheel', function() {});
    });
    return App.start();
  };

  return App;

})();