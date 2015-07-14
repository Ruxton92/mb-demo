var config;

config = require("01_config/client_config");

module.exports = function(Entities, App) {
  var API, carBaseURL;
  carBaseURL = config.apiURL + "car/";
  Entities.Car = Entities.Model.extend({});
  Entities.CarCollection = Entities.Collection.extend({
    model: Entities.Car
  });
  API = {
    carGetModels: function(cb) {
      var cars;
      cars = new Entities.CarCollection();
      cars.url = carBaseURL + "models";
      cars.fetchCollection(cb);
      if (!cb) {
        return cars;
      }
    }
  };
  return App.reqres.setHandler(App.REQUESTS.MODELS, function(cb) {
    return API.carGetModels(cb);
  });
};
