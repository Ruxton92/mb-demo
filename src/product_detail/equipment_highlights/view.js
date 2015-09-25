import $ from 'jquery';
import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import template from './template.hbs';
import ItemView from './detail_view';
import ModalService from '../../modal/service';
import OfferModalView from '../../modal/equipment_highlights/offer_view';

export default CompositeView.extend({
  template: template,
  childView: ItemView,
  childViewContainer: "ul",
  className: "mb-model-detail-edition-highlights-block row",

  ui: {
    'equipmentLink': '.mb-model-detail-edition-highlights-equipment-link'
  },

  events: {
    'click @ui.equipmentLink': 'showEquipmentModal',
  },

  onShow() {
  },

  showEquipmentModal(e) {
    e.preventDefault();
    let view = new OfferModalView();
    ModalService.request('open', view);
  }

});