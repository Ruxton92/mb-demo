import {ItemView} from 'backbone.marionette';
import template from './spinner.hbs';


export default ItemView.extend({
  template: template,
  className: 'mb-spinner',

  initialize() {
  }
});
