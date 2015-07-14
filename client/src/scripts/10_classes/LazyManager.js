var SourceManager;

SourceManager = require("10_classes/SourceManager");

module.exports = function(LazyManager, App, Backbone, Marionette, $, _) {
  var startWithParent;
  startWithParent = true;
  return LazyManager.Class = (function() {
    function _Class() {}

    _Class.prototype.init = function($items, $container) {
      window.lazy = this;
      this.options = {
        threshold: 0,
        event: "scroll"
      };
      this._uid = Math.random() * 1000000;
      this.$items = $items;
      this.$container = $container || $(window);
      this.$container.on(this.options.event + ".scrollManager_" + this._uid, this.onScroll.bind(this));
      this.$container.on("resize.scrollManager_" + this._uid, this.onResize.bind(this));
      this.sourceManager = new SourceManager.Class();
      this.sourceManager.init(void 0, void 0, [
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
      ], false, void 0, false);
      if (this.$items) {
        this.check();
      }
    };

    _Class.prototype.reInit = function($items, $container) {
      if ($items) {
        this.$items = $items;
      }
      if ($container) {
        this.$container = $container;
      }
    };

    _Class.prototype.onScroll = function(e) {
      this.check();
    };

    _Class.prototype.onResize = function(e) {
      this.sourceManager.resize();
      this.check();
    };

    _Class.prototype.check = function() {
      if (!this.$items || 0 === this.$items.length) {
        return;
      }
      this.sourceManager.loadSourceForItems(this.$items.parent().inView(this.$container));
    };

    _Class.prototype.refresh = function($items) {
      this.$items = $items;
      this.check();
    };

    _Class.prototype.close = function() {
      if (!this.$items && !this.$container && !this.sourceManager) {
        return;
      }
      delete this.$items;
      this.$container.off(".scrollManager_" + this._uid);
      delete this.$container;
      this.sourceManager.close();
      delete this.sourceManager;
    };

    return _Class;

  })();
};

