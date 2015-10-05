import {LayoutView} from 'backbone.marionette';


export default LayoutView.extend({
  ui: {
    'next': '.js-next',
    'prev': '.js-prev'
  },

  events: {
    'click @ui.next': 'clickNext',
    'click @ui.prev': 'clickPrev'
  },

  initialize() {
  },

  onShow() {
  },

  clickNext(e) {
    e.preventDefault();
    this.trigger('step:next');
  },

  clickPrev(e) {
    e.preventDefault();
    this.trigger('step:prev');
  }

});