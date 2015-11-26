import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import Syphon from 'backbone.syphon';
import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';

import DreamCarModel from './model';
import template from './template.hbs';

import FormCustomRequired from '../../common/form-custom-required';
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

  initialize() {
    new FormValidatorHelper().initialize();
    this.model.bind('validated:valid', function (model) {
      console.log('everything is valid');
    });
    this.model.bind('validated:invalid', function (model, errors) {
      console.log(errors);
    });
    Backbone.Validation.bind(this);
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
    let form = Syphon.serialize(this);

    this.model.set(form);

    if ( this.model.isValid(true) ) {
      // 
    };
  }
});
