import {Route} from 'backbone-routing';
import View from './view';
import SpinnerService from '../spinner/spinner-service';
import ProductModel from './model';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    //I had to remove parseInt, because Ids with leading 00 were corrupted
    this.productID = options.productID;
  },

  render() {
    let model = new ProductModel();
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
