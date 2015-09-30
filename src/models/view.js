import $ from 'jquery';
import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import itemTemplate from './item_template.hbs';

let ModelView = ItemView.extend({
  template: itemTemplate,
  className: 'mb-models-named-list-item col-xs-12 col-sm-6 col-md-fifth col-lg-2',
});

export default CompositeView.extend({
  template: template,
  className: 'mb-models-page-wrapper',
  childView: ModelView,
  childViewContainer: '.mb-models-named-list',

  regions: {
  },

  ui: {
  },

  events: {
  },

  onShow() {
  }

});
