import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.Collection.extend({
  url: '/api/v2/offer/catalogue/all',
});
