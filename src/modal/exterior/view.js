import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import compositeTemplate from './template.hbs';
import itemTemplate from './slide_template.hbs';


let SlideView = ItemView.extend({
  template: itemTemplate,
  className: 'item',

  ui: {
  },

  events: {
  },

  initialize() {
  }

});


export default CompositeView.extend({
  template: compositeTemplate,
  className: 'mb-fullscreen-modal-content',
  childView: SlideView,
  childViewContainer: '.carousel-inner',

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel',
  },

  ui: {
  },

  events: {
  },

  initialize() {
  },

  onModalShow() {
    this.$el.find('.item')[0].addClass('active');
    console.log(this.$el.find('.item')[0]);
  }
});