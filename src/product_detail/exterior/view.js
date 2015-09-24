import $ from 'jquery';
import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import template from './template.hbs';

import ModalService from '../../modal/service';

import ExteriorModalView from '../../modal/exterior/view';


export default CompositeView.extend({
  template: template,
  className: 'mb-catalogue-page-wrapper',

  regions: {
  },

  ui: {
  },

  events: {
    'click .js-exterior-modal': 'showExteriorModal'
  },

  onShow() {
  },

  templateHelpers() {
    return {
    }
  },

  showExteriorModal(e) {
    e.preventDefault();

    let extDay = this.model.get('stageModules')[0].data[0].car.images360ExtDayClosed;
    let extNight = this.model.get('stageModules')[0].data[0].car.images360ExtNightClosed;
    let slides = [];
    for (let i = 0; i < extDay.length; i++) {
      //slides.push({day: extDay[i].md.url, night: extNight[i].md.url});
      slides.push({day: extDay[i].md.url, night: 'http://placehold.it/1305x734'});
    }
    let slidesCollection = new Backbone.Collection(slides);

    let view = new ExteriorModalView({collection: slidesCollection});
    ModalService.request('open', view);
  }

});
