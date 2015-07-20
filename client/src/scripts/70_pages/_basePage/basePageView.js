module.exports = function(Show, App) {
  Show.View = App.Views.LayoutView.extend({
    el: 'body',
    regions: {
      regionHeader: '.region-header',
      regionFooter: '.region-footer'
    }
  });
};
