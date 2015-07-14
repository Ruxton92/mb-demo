module.exports = function(Views, App, Backbone, Marionette, $, _, options) {
  return Views.CollectionView = Marionette.CollectionView.extend({
    itemViewEventPrefix: "childview"
  });
};