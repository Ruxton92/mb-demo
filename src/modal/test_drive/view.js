import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';

import {LayoutView} from 'backbone.marionette';
import {ItemView} from 'backbone.marionette';

import template from './template.hbs';

import StepOneView from './step_one/view.js';
import StepTwoView from './step_two/view.js';
import StepThreeView from './step_three/view.js';

import TestDriveModel from './model.js'

let model = new TestDriveModel()

export default LayoutView.extend({
  model: model,
  template: template,
  className: 'mb-fullscreen-modal-content mb-test-dive-page-wrapper',

  regions: {
    stepOneRegion: '.mb-test-drive-step-one-region',
    stepTwoRegion: '.mb-test-drive-step-two-region',
    stepThreeRegion: '.mb-test-drive-step-three-region'
  },
  
  triggers: {
    'click .close' : 'cancel',
    'click .js-finish' : 'cancel'
  },

  initialize() {
    this.stepOneView = new StepOneView({model: this.model});
    this.stepTwoView = new StepTwoView();
    this.stepThreeView = new StepThreeView({model: this.model});
  },

  onShow() {
    this.stepOneRegion.show(this.stepOneView);

    this.stepTwoRegion.show(this.stepTwoView);
    this.stepTwoRegion.$el.hide();

    this.stepThreeRegion.show(this.stepThreeView);
    this.stepThreeRegion.$el.hide();

    this.listenTo(this.stepOneView, 'step:next', this.stepTwoShow);

    this.listenTo(this.stepTwoView, 'step:prev', this.stepOneShow);
    this.listenTo(this.stepTwoView, 'step:next', this.stepThreeShow);

    this.listenTo(this.stepThreeView, 'step:prev', this.stepTwoShow);
    this.listenTo(this.stepThreeView, 'step:next', this.stepFourShow);
  },

  stepOneShow() {
    $('html, body').animate({scrollTop: 0}, 'fast');
    this.stepTwoRegion.$el.hide();
    this.stepOneRegion.$el.show();
  },

  stepTwoShow() {
    $('html, body').animate({scrollTop: 0}, 'fast');
    this.stepOneRegion.$el.hide();
    this.stepThreeRegion.$el.hide();
    this.stepTwoRegion.$el.show();
  },

  stepThreeShow() {
    $('html, body').animate({scrollTop: 0}, 'fast');
    this.stepTwoRegion.$el.hide();
    this.stepThreeView.render();
    this.stepThreeRegion.$el.show();
  }

});
