import ModalService from 'backbone-service-modals';

import LayoutView from './layout-view';

import AlertView   from './alert/view';
import ConfirmView from './confirm/view';
import PromptView  from './prompt/view';

const WiresModalService = ModalService.extend({
  AlertView   : AlertView,
  ConfirmView : ConfirmView,
  PromptView  : PromptView,

  setup(options = {}) {
    this.container = options.container;
  },

  start() {
    this.layout = new LayoutView();
    this.container.show(this.layout);
  },

  render(view) {
    this.layout.content.show(view);
    this.listenTo(view, 'cancel', () => {
      this.request('close');
    });
  },

  remove() {
    this.layout.content.reset();
  },

  animateIn() {
    if (this.views.length) {
      if (this.views[0]['onModalShow']) {
        this.views[0].onModalShow();
      }
    }
    return this.layout.animateIn();
  },

  animateOut() {
    return this.layout.animateOut();
  }
});

export default new WiresModalService();
