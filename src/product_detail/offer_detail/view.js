import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template,
  className: 'row mb-model-offer-block',

  onShow() {
  },
});