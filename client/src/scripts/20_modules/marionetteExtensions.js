module.exports = function(MarionetteExtensions, App, Backbone, Marionette, $, _) {
  var startWithParent;
  startWithParent = true;
  return MarionetteExtensions.on("start", function() {
    return _.extend(Marionette.Application.prototype, {
      navigate: function(route, options) {
        if (route.charAt(0) === "/") {
          route = "#" + route;
        }
        Backbone.history.navigate(route, options);
      },
      getCurrentRoute: function() {
        return Backbone.history.fragment;
      }
    });
  });
};
