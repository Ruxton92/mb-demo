import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import ExteriorView from './exterior/view';

export default LayoutView.extend({
  template: template,

  regions: {
    exteriorRegion: '.mb-model-detail-exterior-region',
  },

  initialize(data) {
    this.exteriorView = new ExteriorView({model: this.model});
  },

  ui: {
  },

  events: {
  },

  onShow() {
    console.debug(this.model);
    console.debug(this.model.attributes);
    this.exteriorRegion.show(this.exteriorView);
  },

  filterOpened() {
  },

  filterClosed() {
  }
});
