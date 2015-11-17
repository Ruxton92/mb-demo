import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/v2/lead/callback',

  validation: {
    "salutation": {
      required: false
    },
    "title": {
      required: false
    },
    "firstName": {
      required: false
    },
    "lastName": {
      required: false
    },
    "phone": {
      required: false
    }
  }

});
