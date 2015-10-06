import {LayoutView} from 'backbone.marionette';
import template from './layout-template.hbs';

export default LayoutView.extend({
  el: '.application',
  template: template,

  regions: {
    header  : '.application__header',
    flashes : '.application__flashes',
    content : '.application__content',
    overlay : '.application__overlay',
    spinner_overlay : '.application__spinner__overlay',
    footer  : '.application__footer'
  },

  ui: {
    overlay : '.application__overlay',
  	spinner_overlay : '.application__spinner__overlay',
  }

});
