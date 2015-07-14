module.exports = function(Entities, App, Backbone, Marionette, $, _) {
  return Entities.Model = Backbone.Model.extend({
    fetchModel: function(options, cb) {
      var _fetchOptions, _options;
      _options = (typeof options === "object" ? options : {});
      if (!cb && typeof options === "function") {
        cb = options;
      }
      _fetchOptions = _.extend(_options, {
        reset: true,
        success: function(model, response, options) {
          if (response.error) {
            return cb(response.err);
          } else {
            if (typeof cb === "function") {
              return cb(null, model);
            }
          }
        },
        error: function(model, response, options) {
          return cb(response);
        }
      });
      return this.fetch(_fetchOptions);
    }
  });
};
