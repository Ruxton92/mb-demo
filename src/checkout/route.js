import {Route} from 'backbone-routing';
import View from './view';
import SpinnerService from '../spinner/spinner-service';
import CheckoutModel from './model';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.productID = options.productID;
  },

  render() {
    let model = new CheckoutModel();
    model.url = model.urlRoot + this.productID;
    this.listenTo(model, 'request', this.showSpinner);
    this.listenTo(model, 'sync', this.hideSpinner);
    model.fetch({
      'success': ()=> {
        this.view = new View({model: model});
        this.container.show(this.view);
      }
    });
  },

  showSpinner() {
    SpinnerService.request('showSpinner');
  },

  hideSpinner() {
    SpinnerService.request('hideSpinner');
  }
});
