var CSSResizeController, LazyManager;

LazyManager = require("10_classes/LazyManager");

CSSResizeController = require("10_classes/CSSResizeController");

module.exports = {
  definition: function(Views, App, Backbone, Marionette, $, _, options) {
    return {
      isMobileDevice: null,
      lazyManager: null,
      resizeController: null,

      /*
        @function initLazyLoading
        enables lazy loading for images
       */
      initLazyLoading: function() {
        this.lazyManager = new LazyManager.Class();
        return this.lazyManager.init(this.$el.find('img.lazy'));
      },

      /*
        @function initCSSResizeController
        bind CSSResizeController to images
       */
      initCSSResizeController: function() {
        this.resizeController = new CSSResizeController.Class();
        return this.$el.find(this.options.resizeController.wrapper).each((function(_this) {
          return function(i, wrapper) {
            $(wrapper).addClass("image-wrapper-resize-" + _this.options.resizeController.mode);
            return _this.resizeController[_this.options.resizeController.mode]($(wrapper), $(wrapper).find('> img'));
          };
        })(this));
      },

      /*
        @function isMobileDevice
        checks if user enters site with mobile device
       */
      isMobileDevice: function() {
        return $('body').hasClass("is-mobile");
      },

      /*
        @function initialize
        is called on view initialization
       */
      initialize: function() {
        var el, k, ref, v;
        if (this.isMobileDevice() && this.mobileEvents) {
          ref = this.mobileEvents;
          for (k in ref) {
            v = ref[k];
            el = k.split(' ')[1];
            this.$el.find(el).hammer();
          }
          return this.events = this.mobileEvents;
        }
      },
      onRender: function() {
        return window.setTimeout((function(_this) {
          return function() {
            if (_this.options.lazyLoading) {
              _this.initLazyLoading();
            }
            if (_this.options.resizeController) {
              return _this.initCSSResizeController();
            }
          };
        })(this), 10);
      },
      onBeforeDestroy: function() {
        if (this.lazyManager) {
          return this.lazyManager.close();
        }
      }
    };
  }
};
