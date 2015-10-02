import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import stepOneTemplate from './step_one_template.hbs';
import stepTwoTemplate from './step_two_template.hbs';
import stepThreeTemplate from './step_three_template.hbs';
import stepFourTemplate from './step_four_template.hbs';

import FormValidatorHelper from '../common/form-validation-helper';


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

let StepOneView = ItemView.extend({
  template: stepOneTemplate,
  className: 'mb-checkout-step-one',

  ui: {
    'next': '.js-next'
  },

  events: {
    'click @ui.next': 'clickNext'
  },

  initialize() {
  },

  clickNext(e) {
    e.preventDefault();
    this.trigger('step:next');
  }

});

let StepTwoView = ItemView.extend({
  template: stepTwoTemplate,
  className: 'mb-checkout-step-two',

  ui: {
    'next': '.js-next',
    'prev': '.js-prev',
    'submit': 'input[name=submit]'
  },

  events: {
    'click @ui.next': 'clickNext',
    'click @ui.prev': 'clickPrev',
    'click @ui.submit': 'submitForm'
  },

  initialize() {
    new FormValidatorHelper().initialize();
    this.model = new CheckoutModel();
    this.model.bind('validated:valid', function (model) {
      console.log('everything is valid');
    });

    this.model.bind('validated:invalid', function (model, errors) {
      console.log(errors);
    });
    Backbone.Validation.bind(this);
  },

  submitForm(e) {
    e.preventDefault();
    let data = {};

    $(':input[type=text]').each(function (index) {
      data[$(this).attr('name')] = $(this).val();
    });

    this.model.set(data);

    if (this.model.isValid(true)) {
      console.log('Success');
    }
  },

  clickNext(e) {
    e.preventDefault();
    this.trigger('step:next');
  },

  clickPrev(e) {
    e.preventDefault();
    this.trigger('step:prev');
  }

});

let StepThreeView = ItemView.extend({
  template: stepThreeTemplate,
  className: 'mb-checkout-step-three',

  ui: {
    'next': '.js-next',
    'prev': '.js-prev'
  },

  events: {
    'click @ui.next': 'clickNext',
    'click @ui.prev': 'clickPrev'
  },

  initialize() {
  },

  clickNext(e) {
    e.preventDefault();
    this.trigger('step:next');
  },

  clickPrev(e) {
    e.preventDefault();
    this.trigger('step:prev');
  }

});

let StepFourView = ItemView.extend({
  template: stepFourTemplate,
  className: 'mb-checkout-step-four',

  ui: {
    'prev': '.js-prev'
  },

  events: {
    'click @ui.prev': 'clickPrev'
  },

  initialize() {
  },

  clickPrev(e) {
    e.preventDefault();
    this.trigger('step:prev');
  }

});


export default LayoutView.extend({
  template: template,
  className: 'mb-checkout-page-wrapper',

  regions: {
    stepOneRegion: '.mb-checkout-step-one-region',
    stepTwoRegion: '.mb-checkout-step-two-region',
    stepThreeRegion: '.mb-checkout-step-three-region',
    stepFourRegion: '.mb-checkout-step-four-region'
  },

  ui: {},

  events: {},

  initialize() {
    this.stepOneView = new StepOneView({model: this.model});
    this.stepTwoView = new StepTwoView();
    this.stepThreeView = new StepThreeView({model: this.model});
    this.stepFourView = new StepFourView();
  },

  onShow() {
    this.stepOneRegion.show(this.stepOneView);

    this.stepTwoRegion.show(this.stepTwoView);
    this.stepTwoRegion.$el.hide();

    this.stepThreeRegion.show(this.stepThreeView);
    this.stepThreeRegion.$el.hide();

    this.stepFourRegion.show(this.stepFourView);
    this.stepFourRegion.$el.hide();

    this.listenTo(this.stepOneView, 'step:next', this.stepTwoShow);

    this.listenTo(this.stepTwoView, 'step:prev', this.stepOneShow);
    this.listenTo(this.stepTwoView, 'step:next', this.stepThreeShow);

    this.listenTo(this.stepThreeView, 'step:prev', this.stepTwoShow);
    this.listenTo(this.stepThreeView, 'step:next', this.stepFourShow);

    this.listenTo(this.stepFourView, 'step:prev', this.stepThreeShow);
  },

  stepOneShow() {
    this.stepTwoRegion.$el.hide();
    this.stepOneRegion.$el.show();
  },

  stepTwoShow() {
    this.stepOneRegion.$el.hide();
    this.stepThreeRegion.$el.hide();
    this.stepTwoRegion.$el.show();
  },

  stepThreeShow() {
    this.stepTwoRegion.$el.hide();
    this.stepFourRegion.$el.hide();
    this.stepThreeRegion.$el.show();
  },

  stepFourShow() {
    this.stepThreeRegion.$el.hide();
    this.stepFourRegion.$el.show();
  }

});
