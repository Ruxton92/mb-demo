module.exports = function(Show, App, Backbone, Marionette, $, _, options) {
  Show.Controller = {


    //viewOptions is mostly an Object with a model or a collection
    //Show.View is defined in hellowordlView, marionette.js allows you to split a module (here Show)
    //in multiple files (we always have controller and view)
    getView: function(viewOptions) {
      return new Show.View(viewOptions);
    },

    startView: function() {
      var view;

      //initially I try to load a model for the whole page, which I slice in main App
      //right now main app would be homepageApp

      if (options.model) {
        this.view = this.getView({model: options.model});

        //the options object should always contain the region, in which the module has to be rendered
        options.region.show(this.view);
      }

      //in the case we don't need a model for the view
      else {

        App.request(App.REQUESTS.FOOTER, function(err, model) {
          view = this.getView({model: model});
          options.region.show(view);
        }.bind(this));

      }
    }
  };
};
