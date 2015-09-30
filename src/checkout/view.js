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
      range: [1, 10]
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
    Backbone.Validation.bind(this);
  },

  onShow() {
  },

  submitForm() {
    let checkoutModel = new CheckoutModel({
      email: this.ui.email.val(),
      phone: this.ui.phone.val(),
      name: this.ui.name.val()
    });
    console.debug(checkoutModel);

    checkoutModel.bind('validated:valid', function (model) {
      console.debug('everything is valid');
    });

    checkoutModel.bind('validated:invalid', function (model, errors) {
      console.log(errors);
    });
  }

});
