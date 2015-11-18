import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/v2/lead/support',
  validation: {
    "deliveryStreet": {
      required: true
    },
    "deliveryHouse": {
      required: true
    },
    "deliveryAdditional": {
      required: false
    },
    "deliveryIndex": {
      required: true
    },
    "deliveryCity": {
      required: true
    },
    "currentcarModel": {
      required: true
    },
    "currentcarYear": {
      required: true
    },
    "currentcarMileage": {
      required: true
    },
    "salutation": {
      required: true
    },
    "firstName": {
      required: true
    },
    "lastName": {
      required: true
    },
    "email": {
      required: true
    }
  }

});
