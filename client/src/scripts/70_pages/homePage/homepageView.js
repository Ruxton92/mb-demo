var LayoutTemplate;

LayoutTemplate = require("./templates/layout.hbs");

module.exports = function(Show, App) {

  Show.View = App.Views.LayoutView.extend({

    template: LayoutTemplate,
    className: 'layout-home',

    regions: {
      regionHeader: '.region-header',
      regionContent: '.region-content',
      regionFooter: '.region-footer'
    }
  });
};