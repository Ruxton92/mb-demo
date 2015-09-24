import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template,
  className: '',

  onShow() {
  },

  templateHelpers() {
    return {
      financing: this.model.get('financing'),
    };
  }
});