module.exports = function(Show, App, Backbone, Marionette, $, _, options) {

  return Show.Controller = {
    compositeView: null,
    itemViews: [],
    getCompositeView: function() {
      return new Show.CompositeView({
        collection: new Backbone.Collection()
      });
    },
    getItemView: function() {
      return new Show.ItemView();
    },
    startView: function(collection) {
      if (collection) {
        this.compositeView = new Show.CompositeView({
          collection: collection
        });
        options.region.show(this.compositeView);
      } else {
        App.request(App.REQUESTS.OFFERS, function(err, collection) {
          this.compositeView = new Show.CompositeView({
            collection: collection
          });
          options.region.show(this.compositeView);
        }.bind(this));
      }
    },

  };
};
