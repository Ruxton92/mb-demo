module.exports = function(App) {
  return {
    clog: function(context, options) {},
    formatDate: function(date) {
      return new Date(date).toString("dd. MM yyyy");
    },
    parseDate: function(dateString, format) {
      if (dateString === void 0 || dateString === null) {
        return;
      }
      return Date.parse(dateString).toString(format);
    },
    isImageURL: function(value) {
      var _isImageURL, _matchHTTP, _matchImageType;
      _isImageURL = false;
      _matchHTTP = value.match(/http:\/\/||https:\/\//);
      _matchImageType = void 0;
      if (_matchHTTP[0].length > 0) {
        _matchImageType = value.match(/(png|jpg|jpeg|tiff|gif)/g);
        if (null !== _matchImageType) {
          _isImageURL = true;
        }
      }
      return _isImageURL;
    },
    json: function(obj) {
      return JSON.stringify(obj);
    },
    locale: function() {
      var _return, args;
      args = arguments;
      return _return = App.locale.get(args[0]);
    },
    isHelper: function() {
      var args, left, operator, options, right;
      args = arguments;
      left = args[0];
      operator = args[1];
      right = args[2];
      options = args[3];
      if (args.length === 2) {
        options = args[1];
        if (left) {
          return options.fn(this);
        }
        return options.inverse(this);
      }
      if (args.length === 3) {
        right = args[1];
        options = args[2];
        if (left === right) {
          return options.fn(this);
        }
        return options.inverse(this);
      }
      if (eR.call(operator, left, right)) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    log: function() {
      console.log(["Values:"].concat(Array.prototype.slice.call(arguments_, 0, -1)));
    },
    debug: function() {
      console.log("Context:", this);
      return console.log(["Values:"].concat(Array.prototype.slice.call(arguments_, 0, -1)));
    },
    buildLinkFromLocaleArray: function(value) {
      var linkHref, linkName, values;
      values = value.split("##");
      linkName = values[0];
      linkHref = values[1];
      return "<a class='dialog-link' href='" + linkHref + "' data-dialog='" + linkHref + "' data-close-tooltip>" + linkName + "</a>";
    }
  };
};
