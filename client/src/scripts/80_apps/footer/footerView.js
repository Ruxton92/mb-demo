var Template;

Template = require("./templates/footerTemplate.hbs");

module.exports = function(Show, App, Backbone, Marionette, $, _, options) {

  Show.View = App.Views.ItemView.extend({
    tagName: 'div',
    className: 'footer-app',
    template: Template,
    events: {},

    initialize: function(_at_options) {
      console.log(_at_options);
      this.options = _at_options !== null ? _at_options : {};

      //call super
      //please have a look at /client/src/scripts/60_views/_base/commonViewDefinitions.js
      //it's some base functions, all views can use
      App.Views.ItemView.prototype.initialize.apply(this, arguments);

    },

    onRender: function() {

    }
  });
};
