import $ from 'jquery';
import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';
import compositeTemplate from './template.hbs';
import itemTemplate from './item_template.hbs';

let TagModel = Backbone.Model.extend({});

let TagView = ItemView.extend({
  tagName: "li",
  template: itemTemplate,
  model: TagModel,

  ui: {
    'removeButton': '.js-catalogue-tag-remove',
  },

  events: {
    'click @ui.removeButton': 'removeTag',
  },

  removeTag() {
    this.model.destroy();
  },
});

export default CompositeView.extend({
  template: compositeTemplate,
  className: 'mb-catalogue-tags-wrapper container-fluid',
  childView: TagView,
  childViewContainer: 'ul',
  childEvents: {
    'all': 'checkCollectionLength',
    'render': 'checkCollectionLength'
  },
  collectionEvents: {
    'add': 'checkCollectionLength',
    'remove': 'checkCollectionLength',
  },

  ui: {
    'clearButton': '.js-clear-catalogue-tags'
  },

  events: {
    'click @ui.clearButton': 'clearQuery'
  },

  onShow() {
    this.$el.addClass('active');
  },

  clearQuery(e) {
    e.preventDefault();
    this.$el.removeClass('active');
    this.trigger('tags:reset');
    this.collection.reset();
  },

  checkCollectionLength(e) {
    let length = this.collection.length;
    // console.debug('length:', length);
    if (length == 0) {
      this.$el.removeClass('active');
    }
    else {
      this.$el.addClass('active');
    }
  }
});
