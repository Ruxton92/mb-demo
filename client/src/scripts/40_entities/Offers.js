var config;

config = require("./../01_config/client_config");

module.exports = function(Entities, App) {

  var API, offersBaseURL;

  offersBaseURL = config.apiURL + "offers";

  Entities.Offers = Entities.Model.extend({});

  Entities.OffersCollection = Entities.Collection.extend({
    model: Entities.Offers
  });

  API = {

    OffersGetModel: function(cb) {

      var offers;

      offers = new Entities.OffersCollection();
      offers.url = offersBaseURL;
      offers.fetchCollection(cb);

      if (!cb) {
        return offers;
      }
    }
  };

  return App.reqres.setHandler(App.REQUESTS.OFFERS, function(cb) {
    return API.OffersGetModel(cb);
  });
};
