module.exports = function() {
  return Array.prototype.explode = function() {
    var i, item, j, len, string;
    string = "";
    for (i = j = 0, len = this.length; j < len; i = ++j) {
      item = this[i];
      if (i > 0) {
        string += "," + item;
      } else {
        string += item;
      }
    }
    return string;
  };
};