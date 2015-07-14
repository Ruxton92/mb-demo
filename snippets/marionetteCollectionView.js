module.exports = function(Show, App, Backbone, Marionette, $, _, options) {

  /*
    Child View for Collection View
    Has be defined above Collection View, if it's below, it won't work
   */
  Show.View = App.Views.ItemView.extend({
    tagName: '',
    className: '',
    template: Template,
    selectors: {},
    events: {},
    initialize: function(options1) {
      this.options = options1 != null ? options1 : {};
      this.options.lazyLoading = true;
      return App.Views.ItemView.prototype.initialize.apply(this, arguments);
    },
    onRender: function() {
      return App.Views.ItemView.prototype.onRender.apply(this, arguments);
    }
  });

  /*
    Collection View
   */
  return Show.View = App.Views.CollectionView.extend({
    tagName: '',
    className: '',
    template: Template,
    childView: Show.ChildView,
    childViewContainer: '',
    selectors: {},
    events: {},
    initialize: function(options1) {
      this.options = options1 != null ? options1 : {};
      this.options.lazyLoading = true;
      return App.Views.ItemView.prototype.initialize.apply(this, arguments);
    },
    onRender: function() {
      return App.Views.ItemView.prototype.onRender.apply(this, arguments);
    }
  });
};