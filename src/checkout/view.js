import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';


let CheckoutModel = Backbone.Model.extend({
  validation: {
    'delivery-street': {
      required: true
    },
    'delivery-house': {
      required: true
    },
    'delivery-index': {
      required: true
    },
    'delivery-city': {
      required: true
    },
    'personal-salutation': {
      required: true
    },
    'personal-first-name': {
      required: true
    },
    'personal-second-name': {
      required: true
    },
    'personal-street': {
      required: true
    },
    'personal-house': {
      required: true
    },
    'personal-index': {
      required: true
    },
    'personal-city': {
      required: true
    },
    'personal-email': {
      required: true
    },
    'trade-in-model': {
      required: true
    },
    'trade-in-date': {
      required: true
    },
    'trade-in-km': {
      required: true
    }
  }
});


export default LayoutView.extend({
  template: template,
  className: 'mb-checkout-page-wrapper',

  regions: {},

  ui: {
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
    let data = {};

    $(':input[type=text]').each(function (index) {
      data[$(this).attr('name')] = $(this).val();
    });

    this.model.set(data);

    if (this.model.isValid(true)) {
      console.log('Success');
    }
  }

});
