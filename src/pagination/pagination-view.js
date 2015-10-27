import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import template from './pagination.hbs';
import item_template from './pagination-item.hbs';

let PageLinkView = ItemView.extend({
	template: item_template,
	tagName: 'li',
	className: 'mb-pagination-item',

	ui: {
		'link': 'a'
	},

	events: {
		'click @ui.link': 'pageClicked'
	},

	pageClicked(e) {
		e.preventDefault();
	}
});

export default CompositeView.extend({
  template: template,
  tagName: 'nav',
  className: 'mb-pagination-wrapper row',
  childView: PageLinkView,
  childViewContainer: '.pagination-numbers',
  events: {
  },

  initialize(data) {
  },

  onShow() {
  }

});
