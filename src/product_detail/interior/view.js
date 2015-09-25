import $ from 'jquery';
import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './template.hbs';
import itemTemplate from './slide_template.hbs';

import ModalService from '../../modal/service';

import InteriorModalView from '../../modal/interior/view';


let SlideView = ItemView.extend({
  template: itemTemplate,
  className: 'mb-interior-large-photo col-xs-6',

  ui: {
  },

  events: {
  },

  initialize() {
  }

});


export default CompositeView.extend({
  template: template,
  className: 'mb-model-detail-interior-block row',
  childView: SlideView,
  childViewContainer: '.mb-interior-large-photo-block',

  ui: {
    'carousel': '.mb-carousel',
    'switchLight': '.js-switch-light',
    'openModal': '.js-interior-modal',
    'slides': '.mb-carousel .item'
  },

  events: {
    'click @ui.openModal': 'showInteriorModal',
  },

  initialize() {
  },

  onShow() {
    this.$el.find('.mb-interior-large-photo').slice(0,2).addClass('active');
  },

  showInteriorModal(e) {
    e.preventDefault();
    let view = new InteriorModalView({collection: this.collection});
    ModalService.request('open', view);
  },

});

