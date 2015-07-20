var CollectionView, CommonViewDefinitions, CompositeView, ItemView, LayoutView, View;

CommonViewDefinitions = require("./../60_views/_base/CommonViewDefinitions");
View = require("./../60_views/_base/view");
ItemView = require("./../60_views/_base/itemView");
LayoutView = require("./../60_views/_base/layoutView");
CollectionView = require("./../60_views/_base/collectionView");
CompositeView = require("./../60_views/_base/compositeView");

module.exports = function(BaseViews, App) {
  var startWithParent;
  startWithParent = true;
  return BaseViews.on("start", function() {
    App.module("Views", CommonViewDefinitions.definition);
    App.module("Views", View);
    App.module("Views", ItemView);
    App.module("Views", LayoutView);
    App.module("Views", CollectionView);
    return App.module("Views", CompositeView);
  });
};
