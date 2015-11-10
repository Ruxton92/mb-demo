import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import ModalService from '../modal/service';
import CallbackModalView from '../modal/callback/view';
import EmailModalView from '../modal/email/view';
import SupportModalView from '../modal/support/view';
import template from './template.hbs';


export default LayoutView.extend({
  template: template,
  className: 'mb-store-info-page-wrapper',

  regions: {
  },

  ui: {
    'tabLinks': '.mb-nav-inside a',
    'tabs': '[class^=tab]'
  },

  events: {
    'click .js-call-callback-modal': 'showCallbackModal',
    'click .js-call-email-modal': 'showEmailModal',
    'click .js-support-modal': 'showSupportModal',
    'click @ui.tabLinks': 'tabLinkClick'
  },

  onShow() {
    
    this.ui.tabs.addClass('hide');
    this.$el.find('.tab1').removeClass('hide');

    // (#storeinfo?tab=tab3) => ["tab", "tab3"]
    let hashSplit = location.hash.slice(location.hash.indexOf('?')+1).split('=');
    
    if ( hashSplit[0] === 'tab') {
      let activeTab = hashSplit[1];

      if ( this.$el.find('.' + activeTab).length ){
        this.ui.tabs.addClass('hide');
        this.$el.find('.' + activeTab).removeClass('hide');

        this.ui.tabLinks.removeClass('active');
        this.ui.tabLinks.filter('[data-tab=' + activeTab + ']').addClass('active');
      }
    }

  },

  showCallbackModal(e) {
    e.preventDefault();
    var view = new CallbackModalView();
    ModalService.request('open', view);
  },

  showEmailModal(e) {
    e.preventDefault();
    var view = new EmailModalView();
    ModalService.request('open', view);
  },

  showSupportModal(e) {
    e.preventDefault();
    var view = new SupportModalView();
    ModalService.request('open', view);
  },

  tabLinkClick(e) {
    e.preventDefault();
    this.ui.tabs.addClass('hide');
    this.ui.tabLinks.removeClass('active');
    $(e.currentTarget).addClass('active');
    let tabName = $(e.currentTarget).data('tab');
    $('.' + tabName).removeClass('hide');
  }

});