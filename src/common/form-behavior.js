import $ from 'jquery';
import Syphon from 'backbone.syphon';
import Behavior from './behavior';


export default Behavior.extend({
  events: {
    'submit form' :                   'handleSubmit',
    'change form input':              'validateInput',
    'blur form input':                'validateInput',
    'keyup form input.input-money':   'parseMoneyInput',
    'change form select':             'validateInput',
  },

  listen: {
    'change model': 'onChange'
  },

  initialize() {
    // this.listenTo(this.view.options.model, 'change', this.onChange);
    // this.view.form = this.view.options.model.attributes;
  },

  serialize() {
    this.view.form = Syphon.serialize(this);
  },

  deserialize() {
    return Syphon.deserialize(this, this.view.form);
  },

  onChange() {
    this.view.form = this.view.model.attributes;
    // this.deserialize();
  },

  onBeforeRender() {
    if (this.view.form) {
      this.serialize();
    }
  },

  onDomRefresh() {
    if (!this.view.form) {
      this.view.form = this.view.model.attributes;
    }
    this.deserialize();
  },

  handleSubmit(event) {
    event.preventDefault();
    this.serialize()
    // this.view.form = Syphon.serialize(this);
  },

  parseMoneyInput(e) {
    e.preventDefault();
    $(e.target).val(this.prettifyNumber($(e.target).val(), ' '));
  },

  validateInput(e) {
    var model = this.view.model;
    var input_name = $(e.target).attr('name');
    var input_money = $(e.target).hasClass('input-money');
    var input_value = '';
    if ($(e.target).attr('type') === 'checkbox') {
      input_value = $(e.target).is(':checked');
    } else {
      input_value = $(e.target).val().trim() || $(e.target).find(':selected').val() || '';
    }
    model.set(input_name, input_value);
    model.isValid(input_name);
  },

  prettifyNumber(x, separator) {
    let x = x.toString().replace(/[^\d]/g, '');
    return x.replace(/ /g,'').replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  },

  unprettifyNumber(x, separator) {
    return x.split(separator).join('');
  },
});