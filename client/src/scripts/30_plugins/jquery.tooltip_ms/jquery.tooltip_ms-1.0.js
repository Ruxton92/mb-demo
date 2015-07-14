module.exports = function(jQuery) {
  return (function($) {
    var methods;
    methods = {
      initTooltip: function(options) {
        var settings;
        settings = {};
        $.extend(settings, this.tooltip_ms.defaults, options);
        return this.each((function(_this) {
          return function(index, el) {
            var _id, _template;
            _template = $(settings.template);
            if (settings.className) {
              _template.addClass(settings.className);
            }
            if (settings.html) {
              _template.find('.bd').html(settings.html);
            }
            if (settings.closeX) {
              if (settings.closeXIcon) {
                _template.find('.cn').prepend("<div class='close'><span>X</span></div>");
              } else {
                _template.find('.cn').prepend("<div class='close'><span>X</span></div>");
              }
            }
            _id = $(el).attr('data-id') || Math.floor(Math.random() * (1000000 - 100000 + 1) + 100000);
            _template.attr('data-id', _id);
            $(el).attr('data-id', _id);
            $('body').append(_template);
            _this;
            _this.on("" + settings.showEvent, function(e) {
              var offsetLeft, offsetTop;
              e.preventDefault();
              offsetTop = _this.offset().top + _this.outerHeight() + "px";
              if (settings.className.indexOf("right-top-right") > -1) {
                offsetLeft = _this.offset().left + _this.outerWidth() + "px";
              } else {
                offsetLeft = _this.offset().left + "px";
              }
              $(".tooltip[data-id='" + _id + "']").attr("style", "transform: translateX(calc(" + offsetLeft + " - 25%)) translateY(" + offsetTop + "); -webkit-transform: translateX(calc(" + offsetLeft + " - 25%)) translateY(" + offsetTop + ");").addClass("show");
              return $(document).on("click.tooltip", function(e) {
                var $clickTarget;
                $clickTarget = $(e.target);
                if ($clickTarget === $(".tooltip[data-id='" + _id + "']") || $clickTarget.parents('.tooltip').length > 0) {
                  return;
                }
                return methods.closeTooltip(_id, settings);
              });
            });
            if (settings.closeX) {
              $(".tooltip[data-id='" + _id + "']").find('.close').on("click", function(e) {
                e.preventDefault();
                e.stopPropagation();
                return methods.closeTooltip(_id, settings);
              });
            }
            return $(".tooltip[data-id='" + _id + "']").find('[data-close-tooltip]').on("click", function(e) {
              return methods.closeTooltip(_id, settings);
            });
          };
        })(this));
      },
      show: function(options) {
        return this.each((function(_this) {
          return function(index, el) {
            return $(el).trigger("click");
          };
        })(this));
      },
      _destroy: function(options) {
        return this.each((function(_this) {
          return function(index, el) {
            var _id, settings;
            settings = {};
            $.extend(settings, _this.tooltip_ms.defaults, options);
            _id = $(el).data('id');
            _this.off("" + settings.showEvent);
            return $(".tooltip[data-id='" + _id + "']").remove();
          };
        })(this));
      },
      _closeTooltip: function(options) {
        return this.each((function(_this) {
          return function(index, el) {
            var _id, settings;
            settings = {};
            $.extend(settings, _this.tooltip_ms.defaults, options);
            _id = $(el).data('id');
            return methods.closeTooltip(_id, settings);
          };
        })(this));
      },
      closeTooltip: function(id, settings) {
        $(".tooltip[data-id='" + id + "']").removeClass("show");
        if (settings.closeCallback && typeof settings.closeCallback === "function") {
          settings.closeCallback();
        }
        return $(document).off("click.tooltip");
      }
    };
    $.fn.tooltip_ms = function(method) {
      if (methods[method]) {
        return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
      } else if (typeof method === "object" || !method) {
        return methods.initTooltip.apply(this, arguments);
      } else {
        return $.error("Method " + method + " does not exist on jquery.tooltip_ms");
      }
    };
    return $.fn.tooltip_ms.defaults = {
      position: 'center top',
      width: 'auto',
      backgroundColor: '#000000',
      textColor: '#ffffff',
      padding: '20px',
      transition: 'opacity',
      template: '<div class="tooltip"><div class="cn"><div class="backdrop"></div><div class="bd"></div></div></div>',
      html: null,
      className: null,
      closeX: false,
      closeXIcon: false,
      closeXIconClassName: 'icon-uE00C-closing-x',
      showEvent: 'click'
    };
  })(jQuery);
};
