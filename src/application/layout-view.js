import {LayoutView} from 'backbone.marionette';
import HeaderView from './header-view';
import FooterView from './footer-view';
import template from './layout-template.hbs';

export default LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    header  : '.application__header',
    flashes : '.application__flashes',
    content : '.application__content',
    overlay : '.application__overlay',
    footer  : '.application__footer'
  },

  onRender() {
    // debugger
    this.headerView = new HeaderView();
    this.header.show(this.headerView);
    this.footerView = new FooterView();
    this.footer.show(this.footerView);
  }
});
