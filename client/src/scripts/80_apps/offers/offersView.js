var CompositeTemplate = require("./templates/offersCompositeTemplate.hbs");
var ItemTemplate = require("./templates/offersItemTemplate.hbs");

module.exports = function(Show, App, Backbone, Marionette, $, _, options) {

  Show.ItemView = App.Views.ItemView.extend({
    tagName: 'div',
    className: 'tab-content-wrap',
    template: ItemTemplate,
    initialize: function(_at_options) {
      this.model = this.model.set({
        index: this.options.itemIndex+1
      });
      console.log(this.model);
      this.options = _at_options !== null ? _at_options : {};
      App.Views.ItemView.prototype.initialize.apply(this, arguments);

    }
  });

  Show.CompositeView = App.Views.CompositeView.extend({
    tagName: 'div',
    className: 'offers-app',
    template: CompositeTemplate,
    childView: Show.ItemView,
    childViewContainer: '.offers-list',
    childViewOptions: function(model, index) {
      return {
        itemIndex: index
      };
    },
    events: {
      'click .tabs li': 'updateTabs',
    },

    initialize: function(_at_options) {
      this.options = _at_options !== null ? _at_options : {};
      App.Views.CompositeView.prototype.initialize.apply(this, arguments);
    },

    onRender: function() {
      this.$tabNav = this.$el.find('.tabs li');
      this.$tabsContent = this.$el.find('.tab-content');
    },

    onShow: function() {

    },
    updateTabs: function(ev) {
        var tab_id = $(ev.target).attr('data-tab');

        this.$tabNav.removeClass('current');
        this.$tabsContent.removeClass('current');

        $(ev.target).addClass('current');
        $("#" + tab_id).addClass('current');

    }
  });
};
