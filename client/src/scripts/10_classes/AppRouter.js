var $, AppRouter, Backbone, Marionette;

$ = require('jquery');
Backbone = require('backbone');
Backbone.$ = $;
Marionette = require('backbone.marionette');

module.exports = AppRouter = (function() {
  var instance;

  instance = null;

  function AppRouter(App) {
    this.App = App;
    if (instance) {
      return instance;
    } else {
      instance = this;
    }
  }

  AppRouter.prototype.appRoutes = {
    "": "onRouteHome",
    "home": "onRouteHome",
    "offer/:id": "onRouteOffer",
    "about": "onRouteAbout",
    "catalogue/:model": "onRouteCatalogue",
    "catalogue": "onRouteCatalogue"
  };

  AppRouter.prototype.initRouter = function() {
    this.App.Router = Marionette.AppRouter.extend({
      appRoutes: this.appRoutes
    });
    return new this.App.Router({
      controller: this.API
    });
  };

  AppRouter.prototype.validateCurrentRoute = function() {
    var current_route, current_route_is_valid, k, ref, v;
    current_route = this.App.getCurrentRoute();
    current_route_is_valid = false;
    ref = this.appRoutes;
    for (k in ref) {
      v = ref[k];
      if (current_route === k) {
        current_route_is_valid = true;
      }
    }
    if (!current_route_is_valid) {
      return this.App.navigate("home");
    }
  };

  AppRouter.prototype.API = {
    onRouteHome: function() {
      return instance.App.vent.trigger(instance.App.EVENTS.ROUTEHOME);
    },
    onRouteOffer: function(offerNumber) {
      return instance.App.vent.trigger(instance.App.EVENTS.ROUTEOFFER, offerNumber);
    },
    onRouteAbout: function() {
      return instance.App.vent.trigger(instance.App.EVENTS.ROUTEABOUT);
    },
    onRouteCatalogue: function() {
      return instance.App.vent.trigger(instance.App.EVENTS.ROUTECATALOGUE);
    }
  };

  return AppRouter;

})();
