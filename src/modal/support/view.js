import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';
import template from './template.hbs';
import moment from 'moment';
window.moment = moment;
export default ItemView.extend({
  template: template,
  className: 'mb-fullscreen-modal-content',

  triggers: {
    'click .btn-default' : 'cancel',
    'click .close'       : 'cancel',
    
  },

  onShow() {
  	// TODO: move datepicker activation to modal service
  	setTimeout(()=> {$('#field-date').datetimepicker({
        inline: true,
        minDate: moment().format(),
        daysOfWeekDisabled: [6]
    });}, 500);
  },
});
