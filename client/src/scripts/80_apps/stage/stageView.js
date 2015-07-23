var CompositeTemplate = require("./templates/stageCompositeTemplate.hbs");
var ItemTemplate = require("./templates/stageItemTemplate.hbs");

module.exports = function(Show, App, Backbone, Marionette, $, _, options) {

  Show.ItemView = App.Views.ItemView.extend({
    tagName: 'li',
    className: 'stage-item',
    template: ItemTemplate,
    initialize: function(_at_options) {
      this.options = _at_options !== null ? _at_options : {};
      App.Views.ItemView.prototype.initialize.apply(this, arguments);

    }
  });

  Show.CompositeView = App.Views.CompositeView.extend({
    tagName: 'div',
    className: 'stage-app',
    template: CompositeTemplate,
    childView: Show.ItemView,
    childViewContainer: '.stage-slider-list',

    initialize: function(_at_options) {
      this.options = _at_options !== null ? _at_options : {};
      App.Views.CompositeView.prototype.initialize.apply(this, arguments);
    },

    onRender: function() {

      this.$caruselContainer = this.$el.find('ul');
      this.$caruselProgressBar = this.$el.find('.progress-indicator');
      this.currentTranslate = 0;
      this.$caruselNext = this.$el.find('.carusel-nav .next');
      this.$caruselPrev = this.$el.find('.carusel-nav .prev');
      this.$caruselItems = this.$caruselContainer.find('li');
      this.itemsCount = this.$caruselItems.length;

      this.setSliderClasses();
    },
    onShow: function () {
      this.sliderWidth = this.$caruselContainer.width();
      this.$caruselContainer.css('width', this.sliderWidth * this.itemsCount);
      this.$caruselItems.css('width', this.sliderWidth);
      this.translateXValue = -(this.sliderWidth);
      this.progressWidth = this.sliderWidth / this.itemsCount;
    },

    events: {
      'click .carusel-nav .prev': 'prevSlide',
      'click .carusel-nav .next': 'nextSlide'
    },
    nextSlide: function() {
      console.log(this.currentTranslate, this.itemsCount);
      if (this.currentTranslate < this.itemsCount-1) {
        this.currentTranslate++;
      } else {
        this.currentTranslate = 0;
        //hide next button
      }
      this.setSliderClasses();
      this.$caruselContainer.css({"transform": "translateX(" + (this.translateXValue * this.currentTranslate) + "px)"},{" -webkit-transform": "translateX(" + (this.translateXValue * this.currentTranslate) + "px)"});
    },

    prevSlide: function() {
      if (this.currentTranslate > 0) {
        this.currentTranslate--;
      } else {
        //hide prev button
      }
      this.setSliderClasses();
      this.$caruselContainer.css({"transform": "translateX(" + (this.translateXValue * this.currentTranslate) + "px)"},{" -webkit-transform": "translateX(" + (this.translateXValue * this.currentTranslate) + "px)"});

    },
    setSliderClasses: function () {

      if (this.itemsCount > 1) {
        switch (this.currentTranslate) {
          case 0:
            this.$caruselNext.removeClass('hide');
            this.$caruselPrev.addClass('hide');
            break;
          case (this.itemsCount - this.itemPerLine):
            this.$caruselNext.addClass('hide');
            this.$caruselPrev.removeClass('hide');
            break;
          default:
            this.$caruselNext.removeClass('hide');
            this.$caruselPrev.removeClass('hide');
        }
      }else{
        this.$caruselNext.addClass('hide');
        this.$caruselPrev.addClass('hide');
      }

      this.$caruselProgressBar.width((100/ (this.itemsCount)) * (this.currentTranslate +1) + "%");

    }
  });
};
