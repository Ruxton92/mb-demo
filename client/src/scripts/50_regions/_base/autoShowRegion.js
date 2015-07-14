var $, Backbone, Marionette;

$ = require('jquery');
Backbone = require('backbone');
Backbone.$ = $;
Marionette = require('backbone.marionette');

module.exports = function(Regions, App) {
  return Regions.AutoShowRegion = Marionette.Region.extend({
    initialize: function() {
      var ref;
      this.behavior = (ref = App.behavior) != null ? ref : "stateless";
      return Marionette.Region.prototype.initialize.apply(this, arguments);
    },
    show: function() {
      console.log(this);
      console.log(this.behavior);
      if (this.behavior === "stateless") {
        return Marionette.Region.prototype.show.apply(this, arguments);
      } else if (this.behavior === "statefull") {
        return this.behavior = "stateless";
      }
    }
  });
};
