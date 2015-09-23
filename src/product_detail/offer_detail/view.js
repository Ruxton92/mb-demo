import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

export default ItemView.extend({
  template,
  className: '',

  onShow() {
    console.debug('model in sub view', this.model);
  },

  serializeData() {
    let context = {};
    context.model = this.model;
    // console.log(context, 'context');
    context.name = 'lol';
    return context;
  }
});