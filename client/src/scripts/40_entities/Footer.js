var config;

config = require("./../01_config/client_config");

module.exports = function(Entities, App) {

  var API, footerldBaseURL;

  footerldBaseURL = config.apiURL + "footer";

  Entities.Footer = Entities.Model.extend({});

  Entities.FooterCollection = Entities.Collection.extend({
    model: Entities.Footer
  });

  API = {

    footerGetModel: function(cb) {

      var footer;

      footer = new Entities.Footer();
      footer.url = footerldBaseURL;
      footer.fetchModel(cb);

      if (!cb) {
        return footer;
      }
    }
  };

  return App.reqres.setHandler(App.REQUESTS.FOOTER, function(cb) {
    return API.footerGetModel(cb);
  });
};
