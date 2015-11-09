import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/v2/lead/dreamcar',

  validation: {
    "description": {
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
    },
    "phone": {
      required: true
    }
  }

});
