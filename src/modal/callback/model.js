import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/v2/lead/callback',

  validation: {
    "customer[salutation]": {
      required: true
    },
    "customer[title]": {
      required: false
    },
    "customer[firstName]": {
      required: true
    },
    "customer[lastName]": {
      required: true
    },
    "customer[phone]": {
      required: false
    }
  }

});
