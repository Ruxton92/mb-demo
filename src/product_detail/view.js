import $ from 'jquery';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';
import ExteriorView from './exterior/view';

export default LayoutView.extend({
  template: template,
  autoRender: false,
  modelEvents: {
    // 'sync': 'render'
  },

  regions: {
    exteriorRegion: '.mb-model-detail-exterior-region',
  },

  initialize(data) {
    // this.productID = parseInt(data.productID);
    // console.debug(this.productID);
    // this.model = new ProductModel();
    // this.model.url = this.model.urlRoot + this.productID;
    // this.model.fetch();
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
