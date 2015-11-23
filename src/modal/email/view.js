import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import Syphon from 'backbone.syphon';
import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';

import EmailModel from './model';
import template from './template.hbs';

import FormCustomRequired from '../../common/form-custom-required';
import FormValidatorHelper from '../../common/form-validation-helper';

let model = new EmailModel();

export default ItemView.extend({
  template: template,
  className: 'mb-fullscreen-modal-content',
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
  
  onShow(){
    new FormCustomRequired().initialize(this);
  },

  handleSubmit(e) {
    e.preventDefault();
    let form = Syphon.serialize(this);

    let additional_data = {
      "delivery": {},
      "dateOfDelivery": 0
    };
    _.extend(form, additional_data);

    this.model.set(form);

    if (this.model.isValid(true)) {
      let data = encodeURIComponent(JSON.stringify(form));
      $.ajax({
        url: '/api/v2/lead/email',
        type: 'POST',
        contentType: 'application/x-www-form-urlencoded',
        data: data,
        success: (response) => {
          console.log(response);
        }
      });
    }
  }
});
