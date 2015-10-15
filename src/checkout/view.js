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

let validatedFormData;

let CheckoutModel = Backbone.Model.extend({
  validation: {
    'delivery-street': {
      required: false
    },
    'delivery-house': {
      required: false
    },
    'delivery-index': {
      required: false
    },
    'delivery-city': {
      required: false
    },
    'personal-salutation': {
      required: false
    },
    'personal-first-name': {
      required: false
    },
    'personal-second-name': {
      required: false
    },
    'personal-street': {
      required: false
    },
    'personal-house': {
      required: false
    },
    'personal-index': {
      required: false
    },
    'personal-city': {
      required: false
    },
    'personal-email': {
      required: false
    },
    'trade-in-model': {
      required: false
    },
    'trade-in-date': {
      required: false
    },
    'trade-in-km': {
      required: false
    }
  }
});

let StepOneView = ItemView.extend({
  template: stepOneTemplate,
  className: 'mb-checkout-step-one',

  ui: {
    'next': '.js-next',
    'carousel': '.mb-carousel',
    'progress': '.progress-bar',
    'slides': '.mb-carousel .item'
  },

  events: {
    'click @ui.next': 'clickNext',
    'slide.bs.carousel @ui.carousel': 'slideStart',
    'slid.bs.carousel @ui.carousel': 'slideEnd'
  },

  onShow() {
    $('html, body').animate({scrollTop: 0}, 'fast');
    this.ui.carousel.carousel({
      interval: false
    });
    this.slidesNum = 2;
    this.interval = parseFloat(100 / this.slidesNum);
    this.ui.progress.css('width', this.interval + '%');
    this.currentSlide = 1;
  },

  slideStart(e) {
    if (e.direction == 'left') {
      if (this.currentSlide == this.slidesNum) this.currentSlide = 1;
      else this.currentSlide += 1;
    }
    else {
      if (this.currentSlide == 1) this.currentSlide = this.slidesNum;
      else this.currentSlide -= 1;
    }
    this.ui.progress.css('width', this.interval * (this.currentSlide) + '%');
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
    'deliveryTypes': '.delivery-type',
  },

  events: {
    'click @ui.next': 'clickNext',
    'click @ui.prev': 'clickPrev',
    'change [name="delivery-type"]': 'changeDeliveryType'
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

  onShow() {
    $('#field-date').datetimepicker({
      inline: true,
      minDate: moment().format(),
      daysOfWeekDisabled: [6]
    });
  },

  clickNext(e) {
    e.preventDefault();
    let modelData = {};

    $('.data-field').each(function (index) {
      modelData[$(this).attr('name')] = $(this).val();
    });

    this.model.set(modelData);

    if (this.model.isValid(true)) {
      validatedFormData = modelData;
      let datePicker = $('#field-date').data("DateTimePicker").date()._d;
      let year = datePicker.getFullYear();
      let month = datePicker.getMonth();
      let date = datePicker.getDate();
      let hour = validatedFormData['delivery-time'];
      let dateOfDelivery = new Date(year, month, date, hour);

      let data = {
        "customer": {
          "salutation": validatedFormData['personal-salutation'],
          "title": validatedFormData['personal-title'],
          "firstName": validatedFormData['personal-first-name'],
          "lastName": validatedFormData['personal-second-name'],
          "phone": validatedFormData['personal-phone'],
          "email": validatedFormData['personal-email'],
          "postalCode": validatedFormData['personal-index'],
          "city": validatedFormData['personal-city'],
          "carTypeVal": "",
          "specialRequests": "",
          "subject": "",
          "message": ""
        },
        "delivery": {
          "firstName": validatedFormData['personal-first-name'],
          "lastName": validatedFormData['personal-second-name'],
          "streetName": validatedFormData['delivery-street'],
          "streetNumber": validatedFormData['delivery-house'],
          "address": validatedFormData['delivery-house'] + ' ' + validatedFormData['delivery-additional'],
          "postalCode": validatedFormData['delivery-index'],
          "city": validatedFormData['delivery-city']
        },
        "dealer": {
          "gssnId": "",
          "city": "",
          "name": "",
          "street": "",
          "zip": ""
        },
        "financeType": [
          "LEASING"
        ],
        "dateOfDelivery": [
          dateOfDelivery
        ]
      };
      console.log(data);

      //$.ajax({
      //  url: 'https://sos-dev.nolteundlauth.de/api/v2/offer/checkout/10211219410',
      //  type: 'POST',
      //  contentType: 'application/json',
      //  dataType: 'json',
      //  data: JSON.stringify(data),
      //  success: (response) => {
      //    console.log(response);
      //  }
      //});
      this.trigger('step:next');
    }
  },

  clickPrev(e) {
    e.preventDefault();
    this.trigger('step:prev');
  },

  changeDeliveryType(e) {
    e.preventDefault();
    this.ui.deliveryTypes.addClass('hide');
    this.$el.find(`.${$(e.currentTarget).val()}`).removeClass('hide');
  }

});

let StepThreeView = ItemView.extend({
  template: stepThreeTemplate,
  className: 'mb-checkout-step-three',

  ui: {
    'next': '.js-next',
    'prev': '.js-prev',
    'carousel': '.mb-carousel',
    'progress': '.progress-bar',
    'slides': '.mb-carousel .item'
  },

  events: {
    'click @ui.next': 'clickNext',
    'click @ui.prev': 'clickPrev',
    'slide.bs.carousel @ui.carousel': 'slideStart',
    'slid.bs.carousel @ui.carousel': 'slideEnd'
  },

  templateHelpers() {
    return {
      'personalData': validatedFormData
    }
  },

  onShow() {
    this.ui.carousel.carousel({
      interval: false
    });
    this.slidesNum = 2;
    this.interval = parseFloat(100 / this.slidesNum);
    this.ui.progress.css('width', this.interval + '%');
    this.currentSlide = 1;
  },

  slideStart(e) {
    if (e.direction == 'left') {
      if (this.currentSlide == this.slidesNum) this.currentSlide = 1;
      else this.currentSlide += 1;
    }
    else {
      if (this.currentSlide == 1) this.currentSlide = this.slidesNum;
      else this.currentSlide -= 1;
    }
    this.ui.progress.css('width', this.interval * (this.currentSlide) + '%');
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
    'finish': '.js-finish'
  },

  events: {
    'click @ui.finish': 'clickFinish'
  },

  clickFinish(e) {
    e.preventDefault();
    console.log('Finish');
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
    $('html, body').animate({scrollTop: 0}, 'fast');
    this.stepTwoRegion.$el.hide();
    this.stepOneRegion.$el.show();
  },

  stepTwoShow() {
    $('html, body').animate({scrollTop: 0}, 'fast');
    this.stepOneRegion.$el.hide();
    this.stepThreeRegion.$el.hide();
    this.stepTwoRegion.$el.show();
  },

  stepThreeShow() {
    $('html, body').animate({scrollTop: 0}, 'fast');
    this.stepTwoRegion.$el.hide();
    this.stepFourRegion.$el.hide();
    this.stepThreeView.render();
    this.stepThreeRegion.$el.show();
  },

  stepFourShow() {
    $('html, body').animate({scrollTop: 0}, 'fast');
    this.stepThreeRegion.$el.hide();
    this.stepFourRegion.$el.show();
  }

});
