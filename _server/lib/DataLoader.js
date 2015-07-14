var DataLoader, _, fs, localePath, mockdataPath;

_ = require("underscore");
fs = require("fs");
mockdataPath = __dirname + "/../mockdata/";
localePath = __dirname + "/../locale/";

module.exports = DataLoader = (function() {
  function DataLoader() {}

  DataLoader.prototype.loadMockdata = function(name, cb) {
    return fs.readFile(mockdataPath + name + ".json", function(err, result) {
      if (err) {
        return cb({
          error: err
        });
      } else {
        return cb({
          error: null,
          data: JSON.parse(result)
        });
      }
    });
  };

  DataLoader.prototype.loadLocale = function(cb) {
    return fs.readFile(localePath + "de_de.json", function(err, result) {
      if (err) {
        return cb(err);
      } else {
        return cb(null, JSON.parse(result));
      }
    });
  };

  return DataLoader;

})();