import {Router} from 'backbone-routing';

export default Router.extend({
  onError(err) {
    throw err;
  },
  
  onEnter() {
    $('html, body').animate({
      scrollTop: 0
    }, 250);
  }

});
