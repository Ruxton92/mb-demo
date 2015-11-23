import $ from 'jquery';
import Backbone from 'backbone';
import Syphon from 'backbone.syphon';

import {LayoutView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';

import FormValidatorHelper from '../../../common/form-validation-helper';
import FormCustomRequired from '../../../common/form-custom-required';

export default LayoutView.extend({
  template: template,
  className: 'mb-test-drive-step-one',

  ui: {
    'next': '.js-next',
    'deliveryTypes': '.delivery-type'
  },
  events: {
    'click @ui.next': 'clickNext',
    'change [name="delivery-type"]': 'changeDeliveryType'
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
    new FormCustomRequired().initialize(this);

    $('#field-date-wrapper').datetimepicker({
      inline: true,
      minDate: moment().format(),
      daysOfWeekDisabled: [6]
    });

    this.carselect2()
	},
  clickNext(e) {
  	e.preventDefault();
  	let form = Syphon.serialize(this);
    this.model.set(form);

    if ( this.model.isValid(true) ) {
      this.trigger('step:next');
    };

	},
  changeDeliveryType(e) {
    e.preventDefault();
    this.ui.deliveryTypes.addClass('hide');
    this.$el.find(`.${$(e.currentTarget).val()}`).removeClass('hide');
  },
  
  carselect2(){

    let demoCars = [
      {
        id: '33232434',
        text: 'A-Klasse Limousine',
        imageUrl: '/images/watchlist/democar.jpg'
      },
      {
        id: '33232434',
        text: 'Model d 200',
        imageUrl: '/images/watchlist/democar.jpg'
      },
      {
        id: '33232434',
        text: 'Model gl 350',
        imageUrl: '/images/watchlist/democar.jpg'
      },
      {
        id: '33232434',
        text: 'Model g 500',
        imageUrl: '/images/watchlist/democar.jpg'
      },
      {
        id: '33232434',
        text: 'Model e 200',
        imageUrl: '/images/watchlist/democar.jpg'
      }
    ]

    let select = this.$el.find('#mb-car');
    select.select2({
      data: demoCars,
      formatResult: format,
      formatSelection: format,
      dropdownCssClass: "mb-test-drive-select"
    });
    select.select2('data', demoCars[0]);

    function format(car) {
      return  car.text + "<img class='cars' src='" + car.imageUrl + "'/>";
    }
  }
});