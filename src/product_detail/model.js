import $ from 'jquery';
import Backbone from 'backbone';

export default Backbone.Model.extend({
  urlRoot: '//sos-dev.nolteundlauth.de/api/v2/offer/detail/',
  parse(response) {
    // console.log(response);
    return jsonp(response);
  },
  // sync(method, model, options) {
  //   // By setting the dataType to "jsonp", jQuery creates a function
  //   // and adds it as a callback parameter to the request, e.g.:
  //   // [url]&callback=jQuery19104472605645155031_1373700330157&q=bananarama
  //   // If you want another name for the callback, also specify the
  //   // jsonpCallback option.
  //   // After this function is called (by the JSONP response), the script tag
  //   // is removed and the parse method is called, just as it would be
  //   // when AJAX was used.
  //   options.jsonpCallback = 'fake';
  //   options.dataType = "jsonp";
  //   return Backbone.sync(method, model, options);
  },
});
