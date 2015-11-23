import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: '/api/v2/offer/test-drive/',
  validation: {
    'deliveryStreet': {
      required: false
    },
    'deliveryHouse': {
      required: false
    },
    'deliveryAdditional': {
      required: false
    },
    'deliveryIndex': {
      required: false
    },
    'deliveryCity': {
      required: false
    },

    'salutation': {
      required: false
    },
    'firstName': {
      required: false
    },
    'lastName': {
      required: false
    },
    'phone': {
      required: false
    },
    'email': {
      required: false
    }
  }
});
