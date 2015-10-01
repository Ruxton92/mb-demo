import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';


let CheckoutModel = Backbone.Model.extend({
  validation: {
    name: {
      required: true
    },
    phone: {
      length: 10
    },
    email: {
      required: true,
      pattern: 'email'
    }
  }
});


export default LayoutView.extend({
  template: template,
  className: 'mb-checkout-page-wrapper',

  regions: {},

  ui: {
    'email': 'input[name=email]',
    'name': 'input[name=name]',
    'phone': 'input[name=phone]',
    'submit': 'input[name=submit]'
  },

  events: {
    'click @ui.submit': 'submitForm'
  },

  initialize() {
    this.model = new CheckoutModel();
    this.model.bind('validated:valid', function (model) {
      console.log('everything is valid');
    });

    this.model.bind('validated:invalid', function (model, errors) {
      console.log(errors);
    });
    Backbone.Validation.bind(this);
  },

  onShow() {
  },

  submitForm() {
    this.model.set({
      email: this.ui.email.val(),
      phone: this.ui.phone.val(),
      name: this.ui.name.val()
    });

    if (this.model.isValid(true)) {
      alert('Success');
    }
  }

});
