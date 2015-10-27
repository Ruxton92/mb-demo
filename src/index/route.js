import {Route} from 'backbone-routing';
import View from './view';
import SpinnerService from '../spinner/spinner-service';
import IndexModel from './model';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  render() {
    let model = new IndexModel();
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
