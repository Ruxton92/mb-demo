import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/v2/lead/dreamcar',

  validation: {
    "description": {
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
    },
    "phone": {
      required: false
    }
  }

});
