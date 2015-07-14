module.exports = function(Show, App, Backbone, Marionette, $, _, options) {
  return Show.View = App.Views.LayoutView.extend({
    tagName: '',
    className: '',
    template: Template,
    regions: {},
    events: {},
    initialize: function(options1) {
      this.options = options1 != null ? options1 : {};
      App.Views.ItemView.prototype.initialize.apply(this, arguments);
      return this.options.lazyLoading = true;
    },
    onRender: function() {
      return App.Views.ItemView.prototype.onRender.apply(this, arguments);
    }
  });
};
