import {Route} from 'backbone-routing';
import View from './view';
import ProductModel from './model';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.productID = parseInt(options.productID);
  },

  render() {
    let model = new ProductModel();
    model.url = model.urlRoot + this.productID;
    model.fetch({'success': ()=> {
	    	this.view = new View({model: model});
	    	this.container.show(this.view);
  		}
		});
  }
});
