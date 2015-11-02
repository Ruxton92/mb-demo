import {ItemView} from 'backbone.marionette';
import template from './header.hbs';
import config from './../config';
import IframeWraperView from './../modal/iframewrapper/view'
import ModalService from '../modal/service';
import StoreInfoView from '../footer/store_info/store-info-view';

import Radio from 'backbone.radio';
let userChannel = Radio.channel('user');

export default ItemView.extend({
  template: template,
  events: {
    "click .js-activate-search": "activateSearch",
    "click .js-login": "openCiamLogin"
  },

  activateSearch(e) {
    e.preventDefault();
    this.trigger('search:show');
  },

  openCiamLogin(e) {

  	e.preventDefault();

    var view = new IframeWraperView();

    this.listenTo(userChannel, {
      'user:login' : function() {
        ModalService.request('close', view);    
      }
    });

  	view.setIframeURL(config.ciamURLAuthenticate);
    ModalService.request('open', view);

  }
});
