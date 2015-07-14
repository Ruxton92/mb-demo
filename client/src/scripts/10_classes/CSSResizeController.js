module.exports = function(CSSResizeController, App, Backbone, Marionette, $, _) {
  var startWithParent;
  startWithParent = true;
  return CSSResizeController.Class = (function() {
    function _Class() {}

    _Class.prototype.letterBox = function($container, $image, cb) {
      return this.abstractBox($container, $image, false, cb);
    };

    _Class.prototype.pillarBox = function($container, $image, cb) {
      return this.abstractBox($container, $image, true, cb);
    };

    _Class.prototype.abstractBox = function($container, $image, pillarBox, cb) {
      var aspectContainer, aspectImage, containerHeight, containerWidth, firstImage, imageHeight, imageWidth, smaller;
      firstImage = void 0;
      imageWidth = void 0;
      firstImage = $image.get(0);
      imageWidth = firstImage.naturalWidth;
      if (imageWidth < 1) {
        $image.one('load', (function() {
          setTimeout((function() {
            this.abstractBox($container, $image, pillarBox, cb);
          }).bind(this), 50);
        }).bind(this));
        return;
      }
      imageHeight = void 0;
      containerWidth = void 0;
      containerHeight = void 0;
      smaller = void 0;
      aspectImage = void 0;
      aspectContainer = void 0;
      containerWidth = $container.width();
      containerHeight = $container.height();
      imageHeight = firstImage.naturalHeight;
      smaller = imageWidth <= containerWidth || imageHeight <= containerHeight;
      $container.removeClass('resize-height resize-width');
      if (pillarBox) {
        if (smaller) {

        } else {
          aspectContainer = containerWidth / containerHeight;
          aspectImage = imageWidth / imageHeight;
          if (aspectImage >= aspectContainer) {
            $container.addClass('resize-height');
          } else {
            $container.addClass('resize-width');
          }
        }
      } else {
        if (smaller) {
          aspectContainer = containerWidth / containerHeight;
          aspectImage = imageWidth / imageHeight;
          if (aspectImage >= aspectContainer) {
            $container.addClass('resize-width');
          } else {
            $container.addClass('resize-height');
          }
        } else {

        }
      }
      if (cb) {
        cb();
      }
      $image.trigger('css-resized');
    };

    _Class.prototype.letterBoxAnimated = function($container, $image, zoomFactor, timeInMS) {};

    _Class.prototype.pillarBoxAnimated = function($container, $image, zoomFactor, timeInMS) {};

    _Class.prototype.reset = function($image, hard) {};

    _Class.prototype._calcPillarSize = function($container, $image, zoomFactor) {};

    _Class.prototype._calcLetterSize = function($container, $image, zoomFactor) {};

    _Class.prototype.close = function() {};

    return _Class;

  })();
};

