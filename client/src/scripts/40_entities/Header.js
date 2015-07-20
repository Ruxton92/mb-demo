var config;

config = require("./../01_config/client_config");

module.exports = function(Entities, App) {

  var API, headerldBaseURL;

  headerldBaseURL = config.apiURL + "header";

  Entities.Header = Entities.Model.extend({});

  Entities.HeaderCollection = Entities.Collection.extend({
    model: Entities.Header
  });

  API = {

    headerGetModel: function(cb) {

      var header;

      header = new Entities.Header();
      header.url = headerldBaseURL;
      header.fetchModel(cb);

      if (!cb) {
        return header;
      }
    }
  };

  return App.reqres.setHandler(App.REQUESTS.HEADER, function(cb) {
    return API.headerGetModel(cb);
  });
};
