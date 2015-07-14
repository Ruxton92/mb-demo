var BaseCollection, BaseModel, Car, System;

BaseModel = require("40_entities/_base/models");

BaseCollection = require("40_entities/_base/collections");

System = require("40_entities/System");

Car = require("40_entities/Car");

module.exports = function(EntityLoader, App) {
  var startWithParent;
  startWithParent = true;
  return EntityLoader.on("start", function() {
    App.module("Entities", BaseModel);
    App.module("Entities", BaseCollection);
    App.module("Entities", System);
    return App.module("Entities", Car);
  });
};
