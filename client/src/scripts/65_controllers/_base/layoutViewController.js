module.exports = function(Controllers, App, Backbone, Marionette, $, _, options) {
  return Controllers.LayoutViewController = {
    getRegion: function(regionName) {
      return this.view.getRegion(regionName);
    }
  };
};
