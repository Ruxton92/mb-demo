var config;

config = require("./../01_config/client_config");

module.exports = function(Entities, App) {

  var API, helloWorldBaseURL;

  helloWorldBaseURL = config.apiURL + "helloworld";

  Entities.HelloWorld = Entities.Model.extend({});

  Entities.HelloWorldCollection = Entities.Collection.extend({
    model: Entities.HelloWorld
  });

  API = {

    helloWorldGetModel: function(cb) {

      var helloWorld;

      helloWorld = new Entities.HelloWorld();
      helloWorld.url = helloWorldBaseURL;
      helloWorld.fetchModel(cb);

      if (!cb) {
        return helloWorld;
      }
    }
  };

  return App.reqres.setHandler(App.REQUESTS.HELLOWORLD, function(cb) {
    return API.helloWorldGetModel(cb);
  });
};
