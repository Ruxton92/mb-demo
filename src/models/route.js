import {Route} from 'backbone-routing';
import View from './view';
import ModelsCollection from './collection';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  render() {
  	let collection = new ModelsCollection();
    collection.url = collection.urlRoot;
    collection.fetch({'success': ()=> {
	    	this.view = new View({collection: collection});
	    	this.container.show(this.view);
  		}
		});
  }
});
