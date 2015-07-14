module.exports = function(SourceManager, App, Backbone, Marionette, $, _) {
  var startWithParent;
  startWithParent = true;
  return SourceManager.Class = (function() {
    function _Class() {
      this.$items = void 0;
      this.sourceMap = void 0;
      this.resolutionMap = void 0;
      this.autoLoad = true;
      this.autoReload = true;
      this.loadMap = void 0;
      this.$resizeContainer = $('body');
    }

    _Class.prototype.init = function($items, sourceMap, resolutionMap, autoLoad, changeCB, autoReload, $loaderContainer, $resizeContainer, fallbackMap) {
      this.$items = $items;
      this.changeCB = changeCB;
      this.autoLoad = ("undefined" === typeof autoLoad ? this.autoLoad : autoLoad);
      this.autoReload = ("undefined" === typeof autoReload ? this.autoReload : autoReload);
      this.$resizeContainer = ("undefined" === typeof $resizeContainer ? this.$resizeContainer : $resizeContainer);
      this.$loaderContainer = $loaderContainer;
      this.sourceMap = sourceMap || {
        sd: "data-sd",
        md: "data-md",
        hd: "data-hd",
        uhd: "data-uhd"
      };
      this.fallbackMap = fallbackMap || ["hd", "md", "uhd", "sd"];
      this.resolutionMap = resolutionMap || [
        {
          min: 0,
          source: "sd"
        }, {
          min: 1367,
          source: "md"
        }, {
          min: 1601,
          source: "hd"
        }
      ];
      this.loadedMap = [];
      this.resize();
      if (this.autoLoad) {
        this.loadAllSources();
      }
    };

    _Class.prototype.resize = function() {
      var _temp, i, width;
      width = this.$resizeContainer.width();
      _temp = 0;
      i = void 0;
      i = 0;
      while (i < this.resolutionMap.length) {
        if (this.resolutionMap[i].min > width) {
          break;
        }
        _temp = this.resolutionMap[i];
        i++;
      }
      if (this.quality === _temp.source) {
        return;
      }
      this.quality = _temp.source;
      if (this.autoReload) {
        this.reloadSources();
      }
    };

    _Class.prototype.setQualityOverride = function(quality) {
      if (this._override === quality) {
        return;
      }
      this._override = quality;
      this.reloadSources();
    };

    _Class.prototype.loadSourceForIndex = function(index, cb) {
      if (index >= 0 && index < this.$items.length) {
        this._loadSource(this.$items.eq(index), cb);
      }
    };

    _Class.prototype.loadSourceForItem = function($item) {
      this._loadSource($item);
    };

    _Class.prototype.loadSourceForItems = function($items) {
      if (0 === $items.length) {
        return;
      }
      if (1 < $items.length) {
        $items.each((function(index, item) {
          this._loadSource($(item));
        }).bind(this));
      } else {
        this._loadSource($items);
      }
    };

    _Class.prototype.loadAllSources = function() {
      var i;
      i = void 0;
      i = 0;
      while (i < this.$items.length) {
        this._loadSource(this.$items.eq(i));
        i++;
      }
    };

    _Class.prototype.reloadSources = function() {
      var i;
      i = void 0;
      i = 0;
      while (i < this.loadedMap.length) {
        this._loadSource(this.loadedMap[i]);
        i++;
      }
    };

    _Class.prototype._loadSource = function($item, cb) {
      var $img, data, i, quality, src, targetSrc;
      quality = this._override || this.quality;
      $img = $item.find("img");
      if ($img.length === 0 && $item.is("img")) {
        $img = $item;
      }
      if (!this.sourceMap[quality] || !$img.attr(this.sourceMap[quality])) {
        i = 0;
        while (i < this.fallbackMap.length) {
          if (this.sourceMap[this.fallbackMap[i]] && $img.attr(this.sourceMap[this.fallbackMap[i]])) {
            quality = this.fallbackMap[i];
            break;
          }
          i++;
        }
      }
      data = this.sourceMap[quality];
      targetSrc = void 0;
      src = void 0;
      if ($img.length === 0 && $item.is("img")) {
        $img = $item;
        $item = $img.parent();
      } else {
        if ($img.length === 0) {
          return;
        }
      }
      targetSrc = $img.attr(data);
      src = $img.attr("src");
      if (void 0 === targetSrc || (src === targetSrc && 0 < $img.height())) {
        if (this.changeCB) {
          this.changeCB();
        }
        if (cb) {
          cb();
        }
        return;
      }
      if (this.$loaderContainer) {
        this.$loaderContainer.addClass("loading");
      } else {
        if ($item.is("img")) {
          $item.parent().addClass("loading");
        } else {
          $item.addClass("loading");
        }
      }
      $img.one("load", (function(e) {
        if (this.$loaderContainer) {
          this.$loaderContainer.removeClass("loading");
        } else {
          if ($item.is("img")) {
            $item.parent().removeClass("loading");
          } else {
            $item.removeClass("loading");
          }
        }
        if (this.changeCB) {
          setTimeout((function() {
            this.changeCB();
          }).bind(this), 50);
        }
        if (cb) {
          cb();
        }
      }).bind(this));
      $img.attr("src", targetSrc);
      if (this.autoReload) {
        if ($.inArray($item, this.loadedMap) === -1) {
          this.loadedMap.push($item);
        }
      }
    };

    _Class.prototype.close = function() {
      var i;
      i = void 0;
      delete this.$items;
      delete this.changeCB;
      delete this.$resizeContainer;
      delete this.$loaderContainer;
      i = 0;
      while (i < this.loadedMap.length) {
        this.loadedMap[i].off("load");
        i++;
      }
    };

    return _Class;

  })();
};
