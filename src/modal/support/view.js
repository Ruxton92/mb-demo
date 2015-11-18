import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import Syphon from 'backbone.syphon';

import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';

import SupportModel from './model';
import template from './template.hbs';

import FormValidatorHelper from '../../common/form-validation-helper';
let model = new SupportModel();

export default ItemView.extend({
  template: template,
  className: 'mb-fullscreen-modal-content',
  model: model,

  ui: {
    'deliveryTypes': '.delivery-type',
    'exchangeCar': '.js-exchange-car'
  },

  events: {
    'submit form': 'handleSubmit',
    'change [name="delivery-type"]': 'changeDeliveryType',
    'change [name="js-exchange-car"]': 'changeBayType'
  },

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel',
  },

  onShow(){
    //new FormCustomRequired().initialize(this);
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

  handleSubmit(e) {
    e.preventDefault();
    let form = Syphon.serialize(this);

    this.model.set(form);

    if ( this.model.isValid(true) ) {
      // 
    };
  },

  onModalShow() {
  	$('#field-date').datetimepicker({
        inline: true,
        minDate: moment().format(),
        daysOfWeekDisabled: [6]
    });
  },
  changeDeliveryType(e) {
    e.preventDefault();
    this.ui.deliveryTypes.addClass('hide');
    this.$el.find(`.${$(e.currentTarget).val()}`).removeClass('hide');
  },
  changeBayType(e){
    e.preventDefault();
    this.ui.exchangeCar.toggleClass('hide');
  }
});
