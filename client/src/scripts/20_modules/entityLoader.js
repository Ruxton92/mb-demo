var BaseCollection, BaseModel, HelloWorld, Car, System;

BaseModel = require("40_entities/_base/models");

BaseCollection = require("40_entities/_base/collections");

QuickEntryLevel = require("40_entities/QuickEntryLevel");
HelloWorld = require("40_entities/HelloWorld");
Header = require("40_entities/Header");
Footer = require("40_entities/Footer");
System = require("40_entities/System");
Car = require("40_entities/Car");

module.exports = function(EntityLoader, App) {
  var startWithParent;

  startWithParent = true;

  EntityLoader.on("start", function() {
    App.module("Entities", BaseModel);
    App.module("Entities", BaseCollection);
    App.module("Entities", HelloWorld);
    App.module("Entities", QuickEntryLevel);
    App.module("Entities", Header);
    App.module("Entities", Footer);
    App.module("Entities", System);
    App.module("Entities", Car);
  });
};
