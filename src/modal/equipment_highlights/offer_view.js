import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './offer_template.hbs';
import itemTemplate from './slide_template.hbs';

export default ItemView.extend({
  template,
  className: 'mb-fullscreen-modal-content',

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel',
  },

  initialize() {
    // this.lightOn = true;
  },

  onModalShow() {
    console.log(this.collection);
  },
});