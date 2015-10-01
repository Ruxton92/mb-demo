import Backbone from 'backbone';
import Service from 'backbone.service';
import View from './pagination-view';

const PaginationService = Service.extend({
  setup(options = {}) {
    this.container = options.container;
    this.pages = options.pages;
  },

  start() {
    let collection = new Backbone.Collection();
    for(let i = 1; i <= this.pages; i++) {
      collection.push(new Backbone.Model({number: i}));
    }
    this.view = new View({collection: collection});
    this.container.show(this.view);
  },

  requests: {
    default: ''
  }
});

export default new PaginationService();
