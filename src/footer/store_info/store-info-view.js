import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';
import template from './store_info.hbs';

export default ItemView.extend({
  template: template,
  className: 'modal-dialog modal-lg',

  initialize(options = {}) {
    this.model = new Model(options);
  },

  triggers: {
    'click .close'       : 'cancel'
  }
});
