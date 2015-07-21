var config;

config = require("./../01_config/client_config");

module.exports = function(Entities, App) {

  var API, quickEntryLevelBaseURL;

  quickEntryLevelBaseURL = config.apiURL + "quickentrylevel";

  Entities.QuickEntryLevel = Entities.Model.extend({});

  Entities.HelloWorldCollection = Entities.Collection.extend({
    model: Entities.QuickEntryLevel
  });

  API = {

    QuickEntryLevelGetModel: function(cb) {

      var quickEntryLevel;

      quickEntryLevel = new Entities.QuickEntryLevel();
      quickEntryLevel.url = quickEntryLevelBaseURL;
      quickEntryLevel.fetchModel(cb);

      if (!cb) {
        return quickEntryLevel;
      }
    }
  };

  return App.reqres.setHandler(App.REQUESTS.QUICKENTRYLEVEL, function(cb) {
    return API.QuickEntryLevelGetModel(cb);
  });
};
