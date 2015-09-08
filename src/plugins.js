import Backbone from 'backbone';
import $ from 'jquery';
window.$ = $;
Backbone.$ = $;
import Marionette from 'backbone.marionette';
import 'bootstrap';
import 'backbone.syphon';
import 'backbone-query-parameters';
import 'babel/polyfill';
import 'slick-carousel';
import 'eonasdan-bootstrap-datetimepicker';

// start the marionette inspector
if (window.__agent) {
  window.__agent.start(Backbone, Marionette);
}
