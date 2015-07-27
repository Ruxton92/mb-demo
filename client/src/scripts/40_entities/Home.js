var config;

config = require("./../01_config/client_config");

module.exports = function(Entities, App) {

  var API, homeBaseURL;

  homeBaseURL = config.apiURL + "home";

  Entities.HomeCollection = Entities.Model.extend({});

  Entities.HomeCollectionCollection = Entities.Collection.extend({
    model: Entities.HomeCollection
  });

  API = {

    homeGetModel: function(cb) {
      var home;

      home = new Entities.HomeCollection();
      home.url = homeBaseURL;
      home.fetchModel(cb);

      if (!cb) {
        return home;
      }
    }
  };

  return App.reqres.setHandler(App.REQUESTS.HOME, function(cb) {
    return API.homeGetModel(cb);
  });
};
