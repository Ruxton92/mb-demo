var CompositeTemplate = require("./templates/quickEntryLevelCompositeTemplate.hbs");
var ItemTemplate = require("./templates/quickEntryLevelItemTemplate.hbs");

module.exports = function(Show, App, Backbone, Marionette, $, _, options) {

  Show.ItemView = App.Views.ItemView.extend({
    tagName: 'div',
    className: 'quick-item',
    initialize: function(_at_options) {
      console.log(_at_options);
      this.options = _at_options !== null ? _at_options : {};
      App.Views.ItemView.prototype.initialize.apply(this, arguments);

    }
  });

  Show.CompositeView = App.Views.CompositeView.extend({
    tagName: 'div',
    className: 'quick-entry-level-item-app',
    template: CompositeTemplate,
    childView: Show.ItemView,
    childViewContainer: '#quick-items',
    initialize: function(_at_options) {
      console.log(_at_options);
      this.options = _at_options !== null ? _at_options : {};

      App.Views.CompositeView.prototype.initialize.apply(this, arguments);
    },
  });
};
