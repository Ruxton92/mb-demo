import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import {CompositeView} from 'backbone.marionette';
import template from './template.hbs';
import itemTemplate from './item_template.hbs';


let FilterView = ItemView.extend({
  template: itemTemplate,
  tagName: 'li',
  className: 'dropdown',

  ui: {
  },

  events: {
  },

  initialize() {
  }

});


export default CompositeView.extend({
  template: template,
  className: 'mb-catalogue-filter-wrapper',
  childView: FilterView,
  childViewContainer: '.mb-catalogue-filters-list',

  ui: {
  	'filterHeaders': '.dropdown button',
  	'options': '.mb-catalogue-filter-option',
  	'submiters': '.mb-catalogue-filter-submit button',
    'scrollToTop': '.js-scroll-to-top',
  },

  events: {
  	'click @ui.filterHeaders': 'filterHeaderClicked',
  	'click @ui.options': 'optionClicked',
  	'click @ui.submiters': 'filterSubmited',
    'show.bs.dropdown': 'filterOpened',
    'hide.bs.dropdown': 'filterClosed',
    'click @ui.scrollToTop': 'scrollToTop'
  },

  onShow() {

  },

  optionClicked(e) {
  	e.stopPropagation();
  },

  filterSubmited(e) {
  	e.preventDefault();
  	this.trigger('filter:closed');
  },

  filterHeaderClicked(e) {
  	e.preventDefault();
  	$('html, body').animate({ scrollTop: this.$el.offset().top }, 'slow');
    this.$el.addClass('show-arrow-up');
  },

  scrollToTop(e) {
    e.preventDefault();
    this.$el.removeClass('show-arrow-up');
    $('html, body').animate({ scrollTop: 0 }, 'slow');
  },

  filterOpened() {
    this.trigger('filter:opened');
  },

  filterClosed() {
    this.trigger('filter:closed');
  },
});
