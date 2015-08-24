import {Router} from 'backbone-routing';

export default Router.extend({
  onError(err) {
    throw err;
  }
});
