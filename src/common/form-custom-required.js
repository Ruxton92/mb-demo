import $ from 'jquery';

export default class FormCustomRequired {
  initialize(view) {

    let fields = view.model.validation;
    for (let field in fields) {
      let $inputGroup = $(view.el).find(`[name='${field}']`).parent(),
          $labelText = $inputGroup.find('label').text();

      if ($labelText.indexOf('*') !== -1) {
        fields[field].required = true;
      };
    }

  }
}