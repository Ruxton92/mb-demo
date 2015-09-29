import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.Collection.extend({
  urlRoot: '//sos-dev.nolteundlauth.de/api/v2/offer/catalogue/all',
});
