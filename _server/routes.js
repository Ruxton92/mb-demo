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
  app.get("/api/system/locale", function(req, res) {
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

  app.get("/api/helloworld", function(req, res) {
    var dataloader;

    dataloader = new DataLoader();

    dataloader.loadHelloworldData(function(result) {
      if (result.error) {
        return res.status(500).send(result.error);
      } else {
        return res.status(200).send(result.data);
      }
    });
  });

  app.get("/api/home", function(req, res) {
    var dataloader;

    dataloader = new DataLoader();

    dataloader.loadHomeData(function(result) {
      if (result.error) {
        return res.status(500).send(result.error);
      } else {
        return res.status(200).send(result.data);
      }
    });
  });

  app.get("/api/header", function(req, res) {
    var dataloader;

    dataloader = new DataLoader();

    dataloader.loadHeaderData(function(result) {
      if (result.error) {
        return res.status(500).send(result.error);
      } else {
        return res.status(200).send(result.data);
      }
    });
  });

  app.get("/api/footer", function(req, res) {
    var dataloader;

    dataloader = new DataLoader();

    dataloader.loadFooterData(function(result) {
      if (result.error) {
        return res.status(500).send(result.error);
      } else {
        return res.status(200).send(result.data);
      }
    });
  });

  app.get("/api/quickentrylevel", function(req, res) {
    var dataloader;

    dataloader = new DataLoader();

    dataloader.loadQuickEntryLevelData(function(result) {
      if (result.error) {
        return res.status(500).send(result.error);
      } else {
        return res.status(200).send(result.data);
      }
    });
  });
};
