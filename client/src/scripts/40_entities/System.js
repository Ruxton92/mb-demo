var config;

config = require("01_config/client_config");

module.exports = function(Entities, App) {
  var API, systemBaseURL;
  systemBaseURL = config.apiURL + "system/";
  Entities.System = Entities.Model.extend({});
  API = {
    systemGetLocale: function(cb) {
      var locale;
      locale = new Entities.System();
      locale.url = systemBaseURL + "locale";
      locale.fetchModel(cb);
      if (!cb) {
        return locale;
      }
    }
  };
  return App.reqres.setHandler(App.REQUESTS.LOCALE, function(cb) {
    return API.systemGetLocale(cb);
  });
};