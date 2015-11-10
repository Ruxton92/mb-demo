import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
  urlRoot: '/api/v2/lead/callback',

  validation: {
    "firstName": {
      required: true
    },
    "lastName": {
      required: true
    },
    "phone": {
      required: false
    }
  }

});
