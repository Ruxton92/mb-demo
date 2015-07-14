define([], function() {
  var Controller;
  Controller = (function() {
    function Controller() {}

    Controller.prototype.letterBox = function($container, $image, zoomFactor, cb) {
      var size;
      if ($image.get(0).naturalWidth < 1) {
        $image.one("load", (function() {
          setTimeout((function() {
            this.letterBox($container, $image, zoomFactor);
          }).bind(this), 50);
        }).bind(this));
        return;
      }
      size = this._calcLetterSize($container, $image, zoomFactor);
      $image.css({
        width: size.width,
        height: size.height,
        "margin-left": size.x,
        "margin-top": size.y
      });
      if (cb) {
        cb();
      }
    };

    Controller.prototype.letterBoxAnimated = function($container, $image, zoomFactor, timeInMS) {
      var size;
      size = this._calcLetterSize($container, $image, zoomFactor);
      $image.stop();
      $image.animate({
        width: size.width,
        height: size.height,
        "margin-left": size.x,
        "margin-top": size.y
      });
    };

    Controller.prototype.pillarBox = function($container, $image, zoomFactor, cb) {
      var size;
      if ($image.get(0).naturalWidth < 1) {
        $image.one("load", (function() {
          setTimeout((function() {
            this.pillarBox($container, $image, zoomFactor, cb);
          }).bind(this), 50);
        }).bind(this));
        return;
      }
      size = this._calcPillarSize($container, $image, zoomFactor);
      $image.css({
        width: size.width,
        height: size.height,
        "margin-left": size.x,
        "margin-top": size.y
      });
      if (cb) {
        cb();
      }
    };

    Controller.prototype.pillarBoxAnimated = function($container, $image, zoomFactor, timeInMS) {
      var size;
      size = this._calcPillarSize($container, $image, zoomFactor);
      $image.stop();
      $image.animate({
        width: size.width,
        height: size.height,
        "margin-left": size.x,
        "margin-top": size.y
      });
    };

    Controller.prototype.reset = function($image, hard) {
      if (!hard) {
        $image.css({
          width: "auto",
          height: "auto",
          "margin-left": 0,
          "margin-top": 0
        });
      } else {
        $image.css({
          width: "100%",
          height: "auto",
          "margin-left": 0,
          "margin-top": 0
        });
      }
    };

    Controller.prototype._calcPillarSize = function($container, $image, zoomFactor) {
      var containerHeight, containerWidth, diff, factor, imageHeight, imageWidth, img, leftOffset, topOffset;
      zoomFactor = zoomFactor || 1;
      containerWidth = $container.width();
      containerHeight = $container.height();
      img = $image.get(0);
      imageWidth = img.naturalWidth;
      imageHeight = img.naturalHeight;
      factor = imageWidth / imageHeight;
      diff = imageWidth / containerWidth;
      if (imageHeight / diff < containerHeight) {
        imageHeight = containerHeight * zoomFactor;
        imageWidth = imageHeight * factor;
      } else {
        imageWidth = containerWidth * zoomFactor;
        imageHeight = imageWidth / factor;
      }
      leftOffset = (imageWidth - containerWidth) / -2;
      topOffset = (imageHeight - containerHeight) / -2;
      return {
        width: imageWidth,
        height: imageHeight,
        x: leftOffset,
        y: topOffset
      };
    };

    Controller.prototype._calcLetterSize = function($container, $image, zoomFactor) {
      var containerHeight, containerWidth, diff, factor, imageHeight, imageWidth, img, leftOffset, topOffset;
      zoomFactor = zoomFactor || 1;
      containerWidth = $container.width();
      img = $image.get(0);
      containerHeight = $container.height();
      imageWidth = img.naturalWidth;
      imageHeight = img.naturalHeight;
      factor = imageWidth / imageHeight;
      diff = imageWidth / containerWidth;
      if (imageHeight / diff > containerHeight) {
        imageHeight = containerHeight * zoomFactor;
        imageWidth = imageHeight * factor;
      } else {
        imageWidth = containerWidth * zoomFactor;
        imageHeight = imageWidth / factor;
      }
      leftOffset = (imageWidth - containerWidth) / -2;
      topOffset = (imageHeight - containerHeight) / -2;
      return {
        width: imageWidth,
        height: imageHeight,
        x: leftOffset,
        y: topOffset
      };
    };

    Controller.prototype.close = function() {};

    return Controller;

  })();
  return Controller;
});
