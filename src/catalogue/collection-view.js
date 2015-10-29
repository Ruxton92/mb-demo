import {ItemView} from 'backbone.marionette';
import {CompositeView} from 'backbone.marionette';
import Backbone from 'backbone';
import collection_template from './collection_template.hbs';
import itemTemplate from './item_template.hbs';
import $ from 'jquery';

let OfferView = ItemView.extend({
  template: itemTemplate,
  className: 'mb-catalogue-item col-xs-12 col-sm-6 col-md-4 col-lg-4',

  ui: {
  },

  events: {
    "click": "onOfferClick"
  },

  initialize() {
  },

  onOfferClick(e) {

    e.stopPropagation()

    var $clickedItem = $(e.currentTarget),
      $linkInside = $clickedItem.find('a'),
      link = $linkInside.attr('href');

    window.location.href = link;

  }


});

export default CompositeView.extend({
  template: collection_template,
  childView: OfferView,
  childViewContainer: '.mb-catalogue-items',

  ui: {
  },

  initialize(data) {

  },

  onShow() {
  },

});
