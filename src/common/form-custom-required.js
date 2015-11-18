import $ from 'jquery';
import Backbone from 'backbone';
import Radio from 'backbone.radio';

export default class FormCustomRequired {
  initialize(view) {

    let fields = view.model.validation;
    console.log(fields)
/*    
    for (let field in fields) {
      let $inputGroup = $(view.el).find(`[name='${field}']`).parent(),
          $labelText = $inputGroup.find('label').text();

      if ($labelText.indexOf('*') !== -1) {
        fields[field].required = true;
      }
    }*/

  }
}