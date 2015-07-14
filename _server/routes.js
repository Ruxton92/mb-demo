var DataLoader, fs;

fs = require("fs");
DataLoader = require("./lib/DataLoader");

module.exports = function(app, port) {
  app.get("/", function(req, res) {
    console.log(port);
    return res.render("index");
  });
  app.get("/home", function(req, res) {
    return res.render("index");
  });

  /*

    @route /api/ping
    it's used to check the API status
   */
  app.get("/api/system/ping", function(req, res) {
    return res.status(200).send("API reachable");
  });

  /*

    @route /api/locale
    returns the locale object
    @returns Object
   */
  return app.get("/api/system/locale", function(req, res) {
    var dataloader;
    dataloader = new DataLoader();
    return dataloader.loadLocale(function(err, result) {
      if (err) {
        return res.status(500).send(err.message);
      } else {
        return res.status(200).send(result);
      }
    });
  });
};