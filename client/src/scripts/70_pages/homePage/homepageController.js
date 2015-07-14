module.exports = function(Show, App, Marionette, Backbone, $, _) {
  return Show.Controller = _.extend(_.clone(App.Controllers.LayoutViewController), {
    view: null,
    getView: function() {
      return new Show.View();
    },
    startView: function() {
      this.view = this.getView();
      return App.regionMain.show(this.view);
    }
  });
};