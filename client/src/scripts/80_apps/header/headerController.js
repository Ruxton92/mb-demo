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
        console.log(options);
        this.view = this.getView({model: options.model});
        //the options object should always contain the region, in which the module has to be rendered
        options.region.show(this.view);

    }
  };
};
