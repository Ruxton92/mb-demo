import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './item_template.hbs';
import ModalService from '../../modal/service';
import EquipmentHighlightsModalView from '../../modal/equipment_highlights/view';

export default ItemView.extend({
  template,
  itemViewContainer: 'li',

  onShow() {
  },

  events: {
    'click a': 'showModal',
  },

  templateHelpers() {
    return {
      small_photo:  'http://placehold.it/140x100' // this.model.get('sd').url,
    };
  },

  showModal(e) {
    e.preventDefault();
    let view = new EquipmentHighlightsModalView({collection: this.model.collection});
    ModalService.request('open', view);
  }
});