var Backbone;

Backbone = require("backbone");

module.exports = function(Entities, App) {
  return Entities.Collection = Backbone.Collection.extend({
    fetchCollection: function(cb) {
      return this.fetch({
        reset: true,
        success: function(collection, response, options) {
          if (response.error && response.error === "Session closed") {
            return App.vent.trigger("SESSION:TIMEOUT");
          } else {
            if (typeof cb === "function") {
              return cb(null, collection);
            }
          }
        }
      });
    }
  });
};
