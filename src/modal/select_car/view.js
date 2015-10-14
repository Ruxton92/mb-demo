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
    console.debug('selectModel');
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

  ui: {
  },

  initialize(data) {

  },

  onShow() {
  },

});