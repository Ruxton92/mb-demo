import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'mb-fullscreen-modal-content',

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel'
  }
});
