import $ from 'jquery';
import _ from 'lodash';
import Radio from 'backbone.radio';
import nprogress from 'nprogress';
import {Application} from 'backbone.marionette';
import LayoutView from './layout-view';

let routerChannel = Radio.channel('router');
let overlayChannel = Radio.channel('overlay');

nprogress.configure({
  showSpinner: false
});

export default Application.extend({
  initialize() {
    this.$body = $(document.body);
    this.layout = new LayoutView();
    this.layout.render();

    this.listenTo(routerChannel, {
      'before:enter:route' : this.onBeforeEnterRoute,
      'enter:route'        : this.onEnterRoute,
      'error:route'        : this.onErrorRoute
    });

    this.listenTo(overlayChannel, {
      'overlay:show'        : this.showOverlay,
      'overlay:hide'        : this.hideOverlay
    });

    // this.setHeaders();
  },

  // setHeaders() {
  //   let headers = {'X-Requested-With': 'XMLHttpRequest'};
  //   $.ajaxSetup({
  //     headers,
  //     contentType: 'application/json',
  //     crossDomain: true,
  //   });
  // },

  onBeforeEnterRoute() {
    this.transitioning = true;
    // Don't show for synchronous route changes
    _.defer(() => {
      if (this.transitioning) {
        nprogress.start();
      }
    });
  },

  onEnterRoute() {
    this.transitioning = false;
    this.$body.scrollTop(0);
    nprogress.done();
  },

  onErrorRoute() {
    this.transitioning = false;
    nprogress.done(true);
  },

  showOverlay() {
    this.layout.ui.overlay.addClass('active');
  },

  hideOverlay() {
    this.layout.ui.overlay.removeClass('active');
  }

});
