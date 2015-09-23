import $ from 'jquery';
import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import template from './template.hbs';


export default CompositeView.extend({
  template: template,

  regions: {
  },

  ui: {
  },

  events: {
  },

  onShow() {
    console.debug(this.model.get('design'));
  },

  templateHelpers() {
    return {
      test: 'BLAH',
      design: this.model.get('design')
    }
  }

});
