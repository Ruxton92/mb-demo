var config;

config = require("./../01_config/client_config");

module.exports = function(Entities, App) {

  var API, stageBaseURL;

  stageBaseURL = config.apiURL + "stage";

  Entities.Stage = Entities.Model.extend({});

  Entities.StageCollection = Entities.Collection.extend({
    model: Entities.Stage
  });

  API = {

    StageGetModel: function(cb) {

      var stage;

      stage = new Entities.StageCollection();
      stage.url = stageBaseURL;
      stage.fetchCollection(cb);

      if (!cb) {
        return stage;
      }
    }
  };

  return App.reqres.setHandler(App.REQUESTS.STAGE, function(cb) {
    return API.StageGetModel(cb);
  });
};
