import $ from 'jquery';
import {CollectionView} from 'backbone.marionette';
import template from './template.hbs';
import ItemView from './detail_view';

export default CollectionView.extend({
  childView: ItemView,
  itemViewContainer: "ul",
  template,

  onShow() {
  },

  // templateHelpers() {
  //   return {
  //     financing: this.model.get('financing'),
  //     lol: 'lolololo'
  //   };
  // }
});