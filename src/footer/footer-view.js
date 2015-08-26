import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './footer.hbs';

export default ItemView.extend({
  template: template,
  className: 'mb-footer-wrap',
  events: {
    "click .js-scroll-top": "scrollTop"
  },

  scrollTop(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
  }
});
