import {ItemView} from 'backbone.marionette';
import {CompositeView} from 'backbone.marionette';
import collection_template from './template.hbs';
import itemTemplate from './item_template.hbs';
import $ from 'jquery';

let OfferView = ItemView.extend({
  template: itemTemplate,
  className: 'mb-catalogue-item col-xs-12 col-sm-6 col-md-4 col-lg-4',

  ui: {
    'link': 'a'
  },

  events: {
    'click @ui.link': 'selectModel'
  },

  selectModel(e) {
    e.preventDefault();
    this.trigger('car:selected', {'id': 10211219410});
  }

});

export default CompositeView.extend({
  template: collection_template,
  childView: OfferView,
  childViewContainer: '.mb-catalogue-items',
  className: 'mb-fullscreen-modal-content',

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel',
  },

  childEvents: {
    'car:selected': 'carSelected'
  },

  ui: {
  },

  initialize(data) {

  },

  onShow() {
  },

  carSelected() {
    this.trigger('car:selected', {'id': 10211219410});
  }

});