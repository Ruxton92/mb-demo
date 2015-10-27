import {Route} from 'backbone-routing';
import View from './view';
import SpinnerService from '../spinner/spinner-service';
import ProductModel from '../product_detail/model';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

render() {
		this.fetchedModels = 0;
		SpinnerService.request('showSpinner');
    this.model1 = new ProductModel();
    this.model1.url = this.model1.urlRoot + 10211219410;
    this.model1.fetch({
      'success': ()=> {
        this.checkFetch();
      }
    });
    this.model2 = new ProductModel();
    this.model2.url = this.model2.urlRoot + 10211219410;
    this.model2.fetch({
      'success': ()=> {
        this.checkFetch();
      }
    });
  },

  checkFetch() {
  	this.fetchedModels++;
  	if (this.fetchedModels == 2) {
	  	this.view = new View({model1: this.model1, model2: this.model2});
	    this.container.show(this.view);
	    SpinnerService.request('hideSpinner');
  	}
  }

});
