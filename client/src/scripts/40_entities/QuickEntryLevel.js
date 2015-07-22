var config;

config = require("./../01_config/client_config");

module.exports = function(Entities, App) {

  var API, quickEntryLevelBaseURL;

  quickEntryLevelBaseURL = config.apiURL + "quickentrylevel";

  Entities.QuickEntryLevel = Entities.Model.extend({});

  Entities.QuickEntryLevelCollection = Entities.Collection.extend({
    model: Entities.QuickEntryLevel
  });

  API = {

    QuickEntryLevelGetModel: function(cb) {

      var quickEntryLevel;

      quickEntryLevel = new Entities.QuickEntryLevelCollection();
      quickEntryLevel.url = quickEntryLevelBaseURL;
      quickEntryLevel.fetchCollection(cb);

      if (!cb) {
        return quickEntryLevel;
      }
    }
  };

  return App.reqres.setHandler(App.REQUESTS.QUICKENTRYLEVEL, function(cb) {
    return API.QuickEntryLevelGetModel(cb);
  });
};
