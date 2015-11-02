import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';
import Syphon from 'backbone.syphon';
import {ItemView} from 'backbone.marionette';
import {Model} from 'backbone';
import UserService from './../../my_store/my_data/user-service';

import IframeModel from './model';
import template from './template.hbs';

import Radio from 'backbone.radio';

export default ItemView.extend({
  template: template,
  className: 'mb-modal-content-centered',

  events: {
  },

  triggers: {
    'click .close'       : 'cancel'
  },

  ui:{
    iframe: 'iframe'
  },

  initialize(options) {
    this.model = new IframeModel();
    this.userChannel = Radio.channel('user');
  },

  onRender() {
    var _self = this;

    $(window).on('message', function(event) {
      var data = event.originalEvent.data

      console.log(data);

      if (null === data) return;

      if(typeof(data) === "string") {
        data = JSON.parse(data);
      }

      if(data.height) {
        $(_self.ui.iframe).attr('style', 'height: ' + data.height + 'px; width: ' + data.width + 'px;');
        _self.$el.addClass('auto-width');
      }

      //login
      if(data && data.auth && data.code) {
        UserService.request('login', data.code).then( authenticated => {
          console.log(authenticated);
          if(authenticated) {
            console.log(_self);
            _self.cancel();  
          }
        });
      }
    });
  
  },

  setIframeURL(url) {

    this.model.set({iframeURL: url});

  }
});
