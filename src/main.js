import './plugins';
import Backbone from 'backbone';
import $ from 'jquery';

import Application from './application/application';

let app = new Application();

Backbone.history.start();
