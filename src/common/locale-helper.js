import _ from 'lodash';
import $ from 'jquery';
import Handlebars from 'hbsfy/runtime';
import Backbone from 'backbone'
import BackboneValidation from 'backbone-validation';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import 'moment';

export default class LocaleHelper{
  initialize() {
    let localeChannel = Radio.channel('locale');
    Handlebars.registerHelper('locale', function(key, options) {
      let response = localeChannel.request('locale:get', key);
      return response;
    });
  }
}