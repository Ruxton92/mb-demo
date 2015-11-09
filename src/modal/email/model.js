import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/v2/lead/email',

  validation: {
    "subject": {
      required: true
    },
    "message": {
      required: true
    },
    "salutation": {
      required: true
    },
    "title": {
      required: true
    },
    "firstName": {
      required: true
    },
    "lastName": {
      required: true
    },
    "postalCode": {
      required: true,
      pattern: /[0-9]{5}/
    },
    "city": {
      required: true
    },
    "consentContactByEmail": {
      required: true
    }
  }

});
