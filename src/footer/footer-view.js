import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './footer.hbs';

import ModalService from '../modal/service';

import StoreInfoView from './store_info/store-info-view';

export default ItemView.extend({
  template: template,
  className: 'mb-footer',
  events: {
    "click .js-scroll-top": "scrollTop",
    "click .js-store-info": "storeInfo"
  },

  scrollTop(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: 0
    }, 600);
  },

  storeInfo(e) {
    e.preventDefault();
    var view = new StoreInfoView();
    ModalService.request('open', view);
  }
});
