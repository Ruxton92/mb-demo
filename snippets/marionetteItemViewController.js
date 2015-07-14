module.exports = function(Show, App, Backbone, Marionette, $, _, options) {
  return Show.Controller = Marionette.Controller.extend({
    view: null,
    getView: function(viewOptions) {
      return new Show.View(viewOptions);
    },
    startView: function() {
      this.view = this.getView({
        model: options.model
      });
      return options.region.show(this.view);
    }
  });
};

