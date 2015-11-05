import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';
import template from './template.hbs';

export default ItemView.extend({
  template: template,
  className: 'mb-fullscreen-modal-content',

  ui: {
    'deliveryTypes': '.delivery-type',
    'exchangeCar': '.js-exchange-car'
  },

  events: {
    'change [name="delivery-type"]': 'changeDeliveryType',
    'change [name="js-exchange-car"]': 'changeBayType'
  },

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel',
    
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
    var val = $(e.currentTarget).val();

    if ( val === 'yes' ) {
      this.ui.exchangeCar.removeClass('hide')
    } else {
      this.ui.exchangeCar.addClass('hide')
    };


  }
});
