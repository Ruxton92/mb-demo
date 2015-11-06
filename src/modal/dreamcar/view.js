import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import Syphon from 'backbone.syphon';
import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';

import DreamCarModel from './model';
import template from './template.hbs';

import FormValidatorHelper from '../../common/form-validation-helper';

let model = new DreamCarModel();

export default ItemView.extend({
  template: template,
  className: 'mb-fullscreen-modal-content mb-modal-dreamcar',
  model: model,
  
  events: {
    'submit form': 'handleSubmit'
  },

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel'
  },

  onShow() {
    $('#callbacktime-date').datetimepicker({
      inline: true,
      minDate: moment().format(),
      daysOfWeekDisabled: [6]
    });
  },

  handleSubmit(e) {
    e.preventDefault();
  }
});
