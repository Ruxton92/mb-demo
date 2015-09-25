import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './item_template.hbs';
import ModalService from '../../modal/service';
import EquipmentHighlightsModalView from '../../modal/equipment_highlights/view';

export default ItemView.extend({
  template: template,
  tagName: 'li',
  className: 'mb-model-detail-edition-highlights-miniature col-xs-6 col-sm-6 col-md-3 col-lg-3',

  onShow() {
  },

  ui: {
    'photoLink': '.mb-model-detail-edition-highlights-miniature-link',
  },

  events: {
    'click @ui.photoLink': 'showPhotosModal',
  },

  initialize() {
    this.model.set('small_photo', 'http://placehold.it/290x160');
  },

  showPhotosModal(e) {
    e.preventDefault();
    let view = new EquipmentHighlightsModalView({collection: this.model.collection});
    ModalService.request('open', view);
  }
});