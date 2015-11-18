import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/v2/lead/support',
  validation: {
    "deliveryStreet": {
      required: false
    },
    "deliveryHouse": {
      required: false
    },
    "deliveryAdditional": {
      required: false
    },
    "deliveryIndex": {
      required: false
    },
    "deliveryCity": {
      required: false
    },
    "currentcarModel": {
      required: false
    },
    "currentcarYear": {
      required: false
    },
    "currentcarMileage": {
      required: false
    },
    "salutation": {
      required: false
    },
    "firstName": {
      required: false
    },
    "lastName": {
      required: false
    },
    "email": {
      required: false
    }
  }

});
