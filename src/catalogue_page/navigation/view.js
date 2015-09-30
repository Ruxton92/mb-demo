import $ from 'jquery';
import Backbone from 'backbone';
import {LayoutView} from 'backbone.marionette';
import template from './template.hbs';

import FiltersView from './filters/view';
import SearchView from './search/view';
import TagsView from './tags/view';

import FiltersModel from './filters/model';


export default LayoutView.extend({
  template: template,
  className: 'mb-catalogue-navigation-wrapper',

  regions: {
    filtersRegion: ".mb-filters-region",
    searchRegion: ".mb-search-region",
    tagsRegion: ".mb-search-tags-region",
  },

  ui: {
    'searchWrapper': '.mb-catalogue-navigation-search-input-wrapper',
    'clearQueryButton': '.js-clear-search-query',
    'searchInput': '.js-catalogue-search-input',
    'tagsRegion': ".mb-search-tags-region",
    
  },

  events: {
    'click @ui.clearQueryButton': 'clearQuery',
    'change @ui.searchInput': 'searchSubmit',
    
  },

  initialize() {
    let filtersModel = new FiltersModel();
    filtersModel.fetch({
      'success': ()=> {
        let filtersCollection = new Backbone.Collection(filtersModel.get('filters'));
        this.filtersView = new FiltersView({collection: filtersCollection});
        this.filtersRegion.show(this.filtersView);

        this.listenTo(this.filtersView, 'filter:opened', this.filterOpened);
        this.listenTo(this.filtersView, 'filter:closed', this.filterClosed);
      }
    });
  },

  onShow() {

    let searchView = new SearchView();
    this.searchRegion.show(searchView);


    let tagsCollection = new Backbone.Collection([
      {title: 'A 180'},
      {title: 'diesel'},
      {title: 'kompakt'},
    ]);
    let tagsView = new TagsView({collection: tagsCollection});
    this.tagsRegion.show(tagsView);

    this.listenTo(searchView, 'search:activate', this.activateSearch);
    this.listenTo(searchView, 'search:deactivate', this.deactivateSearch);
  },

  filterOpened() {
    this.trigger('filter:opened');
  },

  filterClosed() {
    this.trigger('filter:closed');
  },

  activateSearch() {
    this.ui.searchWrapper.addClass('active');
  },

  deactivateSearch() {
    this.ui.searchWrapper.removeClass('active');
  },

  clearQuery(e) {
    e.preventDefault();
    this.ui.searchInput.val("");
  },

  searchSubmit(e) {
    e.preventDefault();
    let query = $(e.currentTarget).val();
    this.tagsRegion.currentView.collection.push(new Backbone.Model({title: query}));
    this.ui.searchInput.val("");
  },

  scrollToTop(e) {
    e.preventDefault();
    this.filtersView.hideArrowUp();
  }

});
