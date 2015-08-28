import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

import ModalService from './modal/service';
import FooterService from './footer/footer-service';
import HeaderService from './header/header-service';

import IndexRouter from './index/router';
import AboutRouter from './about/router';
import OfferRouter from './offer/router';
import CatalogueRouter from './catalogue/router';

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

app.index = new IndexRouter({
  container: app.layout.content
});

app.about = new AboutRouter({
  container: app.layout.content
});

app.offer = new OfferRouter({
  container: app.layout.content
});

app.catalogue = new CatalogueRouter({
  container: app.layout.content
});


Backbone.history.start();
