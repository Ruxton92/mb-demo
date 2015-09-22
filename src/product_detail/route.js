import {Route} from 'backbone-routing';
import View from './view';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
    this.productID = options.productID;
  },

  render() {
    this.view = new View({productID: this.productID});
    this.container.show(this.view);
  }
});
