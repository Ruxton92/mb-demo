import {LayoutView} from 'backbone.marionette';
import HeaderView from './header-view';
import template from './layout-template.hbs';

export default LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    header  : '.application__header',
    flashes : '.application__flashes',
    content : '.application__content',
    overlay : '.application__overlay'
  },

  onRender() {
    // debugger
    this.headerView = new HeaderView();
    this.header.show(this.headerView);
  }
});
