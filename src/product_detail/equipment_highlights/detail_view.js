import $ from 'jquery';
import {ItemView} from 'backbone.marionette';
import template from './item_template.hbs';
import ModalService from '../../modal/service';
import CallbackModalView from '../../modal/callback/view';


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
      small_photo: this.model.get('sd').url,
    };
  },

  showModal(e) {
    e.preventDefault();
    console.debug(this.model.collection, '1231231321');
    let view = new CallbackModalView();
    ModalService.request('open', view);
  }
});