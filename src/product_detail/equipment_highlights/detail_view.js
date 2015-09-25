import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './item_template.hbs';
import ModalService from '../../modal/service';
import EquipmentHighlightsModalView from '../../modal/equipment_highlights/view';
import EmptyModalView from '../../modal/equipment_highlights/empty_view';

export default ItemView.extend({
  template,
  itemViewContainer: 'li',

  onShow() {
  },

  events: {
    'click a': 'showModal',
  },

  templateHelpers() {
    let text = '';
    if (this.model.get('sd')) {
      text = 'image';
    } else {
      text = 'empty';
    }
    return {
      small_photo:  'http://placehold.it/140x100?text=' + text // this.model.get('sd').url,
    };
  },

  showModal(e) {
    e.preventDefault();
    // let view = new EquipmentHighlightsModalView({collection: this.model.collection});
    if (this.model.get('sd')) {
      let view = new EquipmentHighlightsModalView({collection: this.model.collection});
      ModalService.request('open', view);
    } else {
      let view = new EmptyModalView({collection: this.model.collection});
      ModalService.request('open', view);
    }
  }
});