/*
Default Behavior of all page modules (home/offer/catalogue)
it should define the base layout view with it's regions
it should load all common modules

- main navigaion (model navigation on top)
 */
module.exports = {
  definition: function(Module, App, Backbone, Marionette, $, _) {
    Module.startWithParent = false;
    Module.on('before:start', function() {});
    return Module.on('start', function() {});
  }
};
