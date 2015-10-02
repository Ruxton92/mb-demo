import {Route} from 'backbone-routing';
import View from './view';
import ProductModel from '../product_detail/model';

export default Route.extend({
  initialize(options = {}) {
    this.container = options.container;
  },

  render() {
    let model = new ProductModel();
    model.url = model.urlRoot + '10211219410';
    model.fetch({'success': ()=> {
      this.view = new View({model: model});
      this.container.show(this.view);
    }
    });
  }
});
