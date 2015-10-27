import {ItemView} from 'backbone.marionette';
import template from './header.hbs';

import ModalService from '../modal/service';

import StoreInfoView from '../footer/store_info/store-info-view';

export default ItemView.extend({
  template: template,
  events: {
    "click .js-activate-search": "activateSearch"
  },

  activateSearch(e) {
    e.preventDefault();
    this.trigger('search:show');
  }
});
