module.exports = function(Show, App, Backbone, Marionette, $, _, options) {
  return Show.Controller = App.Controllers.LayoutViewController.extend({
    view: null,
    getView: function() {
      return new Show.View();
    },
    startView: function() {
      this.view = this.getView();
      return options.region.show(this.view);
    }
  });
};
