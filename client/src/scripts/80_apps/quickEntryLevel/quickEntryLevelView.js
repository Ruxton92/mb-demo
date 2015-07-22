var CompositeTemplate = require("./templates/quickEntryLevelCompositeTemplate.hbs");
var ItemTemplate = require("./templates/quickEntryLevelItemTemplate.hbs");

module.exports = function(Show, App, Backbone, Marionette, $, _, options) {

  Show.ItemView = App.Views.ItemView.extend({
    tagName: 'li',
    className: 'quick-item',
    template: ItemTemplate,
    initialize: function(_at_options) {
      console.log(_at_options);
      this.options = _at_options !== null ? _at_options : {};
      App.Views.ItemView.prototype.initialize.apply(this, arguments);

    }
  });

  Show.CompositeView = App.Views.CompositeView.extend({
    tagName: 'div',
    className: 'quick-entry-level-item-app',
    template: CompositeTemplate,
    childView: Show.ItemView,
    childViewContainer: '.quick-list',

    initialize: function(_at_options) {
      this.options = _at_options !== null ? _at_options : {};
      App.Views.CompositeView.prototype.initialize.apply(this, arguments);
    },

    onRender: function() {

      var containerWidth = 1440;
      this.itemPerLine = 6;
      var itemMargin = 34;
      var itemWidth = (containerWidth / this.itemPerLine) + itemMargin / this.itemPerLine;
      this.currentTranslate = 0;
      this.$caruselNext = this.$el.find('.carusel-nav .next');
      this.$caruselPrev = this.$el.find('.carusel-nav .prev');
      this.$caruselContainer = this.$el.find('ul');
      this.$caruselItems = this.$caruselContainer.find('li');
      this.itemsCount = this.$caruselItems.length;
      this.$caruselContainer.css('width', itemWidth * this.itemsCount);
      this.translateXValue = -(itemWidth);
      this.$caruselItems.css('width', itemWidth);
      this.setSliderClasses();
    },
    onShow: function () {

    },

    events: {
      'click .carusel-nav .prev': 'prevSlide',
      'click .carusel-nav .next': 'nextSlide'
    },
    nextSlide: function() {
      if (this.currentTranslate < this.itemsCount - this.itemPerLine) {
        this.currentTranslate++;
      } else {
        this.currentTranslate = 0;
        //hide next button
      }
      this.setSliderClasses();
      this.$caruselContainer.css({"transform": "translateX(" + (this.translateXValue * this.currentTranslate) + "px)"},{" -webkit-transform": "translateX(" + (this.translateXValue * this.currentTranslate) + "px)"});
    },

    prevSlide: function() {
      console.log(this.currentTranslate);
      if (this.currentTranslate > 0) {
        this.currentTranslate--;
      } else {
        //hide prev button
      }
      this.setSliderClasses();
      this.$caruselContainer.css({"transform": "translateX(" + (this.translateXValue * this.currentTranslate) + "px)"},{" -webkit-transform": "translateX(" + (this.translateXValue * this.currentTranslate) + "px)"});

    },
    setSliderClasses: function () {
      console.log(this.itemsCount , this.itemPerLine);
      if (this.itemsCount > this.itemPerLine) {
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
    }
  });
};
