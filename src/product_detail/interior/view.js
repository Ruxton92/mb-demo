import $ from 'jquery';
import Backbone from 'backbone';
import {CompositeView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';

import template from './template.hbs';
import itemTemplate from './item_template.hbs';

import ModalService from '../../modal/service';
import InteriorModalView from '../../modal/interior/view';


let SlideView = ItemView.extend({
  template: itemTemplate,
  className: 'mb-interior-large-photo col-xs-12 col-md-6 item',

  ui: {
  },

  events: {
  },

  initialize() {
  }

});


export default CompositeView.extend({
  template: template,
  className: 'mb-model-detail-interior-block row',
  childView: SlideView,
  childViewContainer: '.mb-interior-large-photo-block',

  ui: {
    'openModal': '.js-interior-modal'
  },

  events: {
    'click @ui.openModal': 'showInteriorModal'
  },

  initialize() {
  },

  onShow() {
    
  },

  showInteriorModal(e) {
    e.preventDefault();
    let intDay = this.model.get('stageModules')[0].data[0].car.images360IntDayClosed;
    let intNight = this.model.get('stageModules')[0].data[0].car.images360IntNightClosed;
    let slidesInt = [];
    for (let i = 0; i < intDay.length; i++) {
      slidesInt.push({day: intDay[i].md.url, night: 'http://placehold.it/1305x734'});
    }
    this.interiorSlidesCollection = new Backbone.Collection(slidesInt);
    let view = new InteriorModalView({collection: this.interiorSlidesCollection});
    ModalService.request('open', view);
  }
});

