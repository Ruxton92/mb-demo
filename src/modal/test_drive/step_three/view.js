import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

import FormValidatorHelper from '../../../common/form-validation-helper';

export default ItemView.extend({
	template: template,
  	className: 'mb-test-drive-step-three'
});