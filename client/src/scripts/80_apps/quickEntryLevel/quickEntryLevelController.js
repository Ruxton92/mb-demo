module.exports = function(Show, App, Backbone, Marionette, $, _, options) {

  return Show.Controller = {
    compositeView: null,
    itemViews: [],
    getCompositeView: function() {
      return new Show.CompositeView({
        collection: new Backbone.Collection()
      });
    },
    /* RUN THIS */
    getItemView: function() {
      return new Show.ItemView();
    },
    startView: function() {
      if (options.collection) {
        this.compositeView = this.getCompositeView({
          collection: options.collection
        });
        options.region.show(this.compositeView);
      } else {
        App.request(App.REQUESTS.QUICKENTRYLEVEL, function(err, collection) {
          this.compositeView = new Show.CompositeView({
            collection: collection
          });
          options.region.show(this.compositeView);
        }.bind(this));
      }
    },

  };
};
