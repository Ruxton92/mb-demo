var LayoutTemplate;

LayoutTemplate = require("./templates/layout.hbs");

module.exports = function(Show, App) {

  Show.View = App.Views.LayoutView.extend({

    template: LayoutTemplate,
    className: 'layout-home',

    regions: {
      regionConnectionOptions: '.region-connection-options',
      regionQuickEntryLevel: '.region-quick-entry-level',
      regionContent: '.region-content'
    }
  });
};
