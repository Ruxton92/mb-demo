import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/v2/lead/email',

  validation: {
    "subject": {
      required: false
    },
    "message": {
      required: false
    },
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
    "postalCode": {
      required: false,
      pattern: /[0-9]{5}/
    },
    "city": {
      required: false
    },
    "consentContactByEmail": {
      required: false
    }
  }

});
