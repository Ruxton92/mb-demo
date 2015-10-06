import {Route} from 'backbone-routing';
import View from './view';
import SpinnerService from '../spinner/spinner-service';
import ModelsCollection from './collection';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  render() {
    let collection = new ModelsCollection();
    this.listenTo(collection, 'request', this.showSpinner);
    this.listenTo(collection, 'sync', this.hideSpinner);
    collection.fetch({
      'success': ()=> {
        this.view = new View({collection: collection});
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
