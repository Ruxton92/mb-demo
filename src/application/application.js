import $ from 'jquery';
import _ from 'lodash';
import Radio from 'backbone.radio';
import nprogress from 'nprogress';
import {Application} from 'backbone.marionette';
import LayoutView from './layout-view';

let routerChannel = Radio.channel('router');
let overlayChannel = Radio.channel('overlay');
let config = require('../config');

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
    $.ajaxPrefilter( ( options, originalOptions, jqXHR ) => {
      options.url = config.api.url + options.url;
      return (options);
    });
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
    console.debug('onBeforeEnterRoute');
    this.transitioning = true;
    // Don't show for synchronous route changes
    _.defer(() => {
      if (this.transitioning) {
        nprogress.start();
      }
    });
  },

  onEnterRoute() {
    console.debug('onEnterRoute');
    $('html, body').animate({ scrollTop: 0 }, 250);
    this.transitioning = false;
    // this.$body.scrollTop(250);
    nprogress.done();
  },

  onErrorRoute() {
    this.transitioning = false;
    nprogress.done(true);
  },

  showOverlay() {
    this.layout.$el.css('height', $(window).height());
    this.layout.$el.css('width', $(window).width());
    this.layout.$el.addClass('no-scroll');
    this.layout.ui.spinner_overlay.addClass('active');
  },

  hideOverlay() {
    this.layout.$el.css('height', 'auto');
    this.layout.$el.css('width', 'auto');
    this.layout.$el.removeClass('no-scroll');
    this.layout.ui.spinner_overlay.removeClass('active');
  }

});
