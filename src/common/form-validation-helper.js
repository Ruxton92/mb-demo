import _ from 'lodash';
import $ from 'jquery';
import Backbone from 'backbone'
import BackboneValidation from 'backbone-validation';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import 'moment';

export default class FormValidatorHelper {
  initialize() {
    let fieldsValidation = Backbone.Radio.channel('fieldsValidation');
    _.extend(BackboneValidation.callbacks, {
      valid(view, attr, selector) {
        //var errorMessage = $(view.el).find(`[name='${attr}']`).siblings('.form-error-message');
        var inputGroup = $(view.el).find(`[name='${attr}']`).parent();
        if (inputGroup.length) {
          inputGroup.removeClass('has-error'); //.find('.form-error-message').text("");
          inputGroup.addClass('is-valid');
        } else {
          //errorMessage.text("").removeClass('text-danger');
        }
        fieldsValidation.trigger('isValid', attr, true);
      },

      invalid(view, attr, error, selector) {
        console.log(attr)
        //var errorMessage = $(view.el).find(`[name='${attr}']`).siblings('.form-error-message');
        var inputGroup = $(view.el).find(`[name='${attr}']`).parent();
        if (inputGroup.length) {
          inputGroup.removeClass('is-valid');
          inputGroup.addClass('has-error'); //.find('.form-error-message').text(error);
        } else {
          //errorMessage.text(error).addClass('text-danger');
        }
        fieldsValidation.trigger('isValid', attr, false);
      }
    });

    _.extend(Backbone.Validation.validators, {
      date: function (value, attr, customValue, model) {
        let date = moment(value, ["DD.MM.YYYY"]);
        if (!date.isValid())
          return 'Incorrect date';
        let today = moment();
        if (Math.abs(date.diff(today, 'years', true)) > 80) {
          return 'Incorrect date';
        }
      }
    });

  }
}