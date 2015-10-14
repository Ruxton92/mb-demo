import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
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
    'click @ui.tabLinks': 'tabLinkClick'
  },

  onShow() {
    this.ui.tabs.addClass('hide');
    this.ui.tabs.eq(0).removeClass('hide');
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