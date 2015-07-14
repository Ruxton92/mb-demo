var LayoutViewController;

LayoutViewController = require("./../65_controllers/_base/layoutViewController");

module.exports = function(BaseControllers, App) {
  var startWithParent;
  startWithParent = true;
  return BaseControllers.on("start", function() {
    return App.module("Controllers", LayoutViewController);
  });
};

