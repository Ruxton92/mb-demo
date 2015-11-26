import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

import FormValidatorHelper from '../../../common/form-validation-helper';

export default ItemView.extend({
	template: template,
  	className: 'mb-test-drive-step-two',

  	ui: {
    	'next': '.js-next',
      'prev': '.js-prev'
  	},

  	events: {
    	'click @ui.next': 'clickNext',
      'click @ui.prev': 'clickPrev'
  	},

    clickPrev(e) {
      e.preventDefault();
      this.trigger('step:prev');
    },

    clickNext(e) {
      e.preventDefault();
      this.trigger('step:next');
    }
});