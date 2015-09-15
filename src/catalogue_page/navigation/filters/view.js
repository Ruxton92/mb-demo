import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'mb-catalogue-filter-wrapper',

  ui: {
  	'filterHeaders': '.dropdown button',
  	'options': '.mb-catalogue-filter-option',
  	'submiters': '.mb-catalogue-filter-submit button',
  },

  events: {
  	'click @ui.filterHeaders': 'filterHeaderClicked',
  	'click @ui.options': 'optionClicked',
  	'click @ui.submiters': 'filterSubmited',
    'show.bs.dropdown': 'filterOpened',
    'hide.bs.dropdown': 'filterClosed'
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
  },

  filterOpened() {
    this.trigger('filter:opened');
  },

  filterClosed() {
    this.trigger('filter:closed');
  },
});
