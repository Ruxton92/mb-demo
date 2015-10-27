import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'mb-catalogue-search-wrapper',

  ui: {
    'button': '.js-activate-search'
  },

  events: {
    'click @ui.button': 'toggleSearch'
  },

  onShow() {

  },

  toggleSearch(e) {
    e.preventDefault();
    if ($(e.currentTarget).hasClass('active')) {
      this.trigger('search:deactivate');
    }
    else {
      this.trigger('search:activate');
    }
    $(e.currentTarget).toggleClass('active');
  }
});
