import _ from 'lodash';
import $ from 'jquery';
import Handlebars from 'hbsfy/runtime';
import Backbone from 'backbone'
import BackboneValidation from 'backbone-validation';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import 'moment';

export default class LocaleHelper{
  initialize(){
    this.localeChannel = Radio.channel('locale');
    Handlebars.registerHelper('locale', function(options) {
      this.overlayChannel.request('locale:get', options);
      // console.debug(options);
      // debugger
      return options.fn(this);
    });
  }
}