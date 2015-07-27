var BaseCollection, BaseModel, HelloWorld, Car, System;

BaseModel = require("40_entities/_base/models");

BaseCollection = require("40_entities/_base/collections");

QuickEntryLevel = require("40_entities/QuickEntryLevel");
Stage = require("40_entities/Stage");
HelloWorld = require("40_entities/HelloWorld");
Header = require("40_entities/Header");
Footer = require("40_entities/Footer");
System = require("40_entities/System");
Car = require("40_entities/Car");
Offers = require("40_entities/Offers");
Home = require("40_entities/Home");

module.exports = function(EntityLoader, App) {
  var startWithParent;

  startWithParent = true;

  EntityLoader.on("start", function() {
    App.module("Entities", BaseModel);
    App.module("Entities", BaseCollection);
    App.module("Entities", HelloWorld);
    App.module("Entities", Stage);
    App.module("Entities", QuickEntryLevel);
    App.module("Entities", Header);
    App.module("Entities", Footer);
    App.module("Entities", System);
    App.module("Entities", Car);
    App.module("Entities", Offers);
    App.module("Entities", Home);
  });
};
