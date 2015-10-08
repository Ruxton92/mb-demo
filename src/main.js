import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

import ModalService from './modal/service';
import FooterService from './footer/footer-service';
import HeaderService from './header/header-service';
import SpinnerService from './spinner/spinner-service';
import PaginationService from './pagination/pagination-service';

import AboutRouter from './about/router';
import CatalogueRouter from './catalogue_page/router';
import CheckoutRouter from './checkout/router';
import ContactRouter from './contact/router';
import IndexRouter from './index/router';
import MeinDataRouter from './my_store/my_data/router';
import ModelsRouter from './models/router';
import OfferRouter from './offer/router';
import ProductDetailRouter from './product_detail/router';
import StoreInfoRouter from './store_info/router';
import WatchlistRouter from './watchlist/router';

let app = new Application();

ModalService.setup({
  container: app.layout.overlay
});

FooterService.setup({
  container: app.layout.footer
});

HeaderService.setup({
  container: app.layout.header
});

SpinnerService.setup({
  container: app.layout.spinner_overlay
});
SpinnerService.request();

app.index = new IndexRouter({
  container: app.layout.content
});

app.about = new AboutRouter({
  container: app.layout.content
});

app.models = new ModelsRouter({
  container: app.layout.content
});

app.offer = new OfferRouter({
  container: app.layout.content
});

app.catalogue = new CatalogueRouter({
  container: app.layout.content
});

app.contact = new ContactRouter({
  container: app.layout.content
});

app.contact = new CheckoutRouter({
  container: app.layout.content
});

app.product_detail = new ProductDetailRouter({
  container: app.layout.content
});

app.store_info = new StoreInfoRouter({
  container: app.layout.content
});

app.my_data = new MeinDataRouter({
  container: app.layout.content
});

app.watchlist = new WatchlistRouter({
  container: app.layout.content
});

Backbone.history.start();