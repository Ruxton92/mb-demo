import $ from 'jquery';
import {Model} from 'backbone';

export default Model.extend({
	url: '/api/v2/user/info',
  customer: {}
});
