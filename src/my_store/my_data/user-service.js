import $ from 'jquery';
import _ from 'lodash';
import Handlebars from 'handlebars';
import Service from 'backbone.service';
import UserModel from './model';
import Radio from 'backbone.radio';

let userChannel = Radio.channel('user');

const UserService = Service.extend({

	start() {
		var _self = this;
		//create new user model
		this.model = new UserModel();

		//register event listeners
		// this.listenTo(userChannel, {
  //     'user:update': this.updateUser,
  //     'user:get': this.getUser
  //   });

	},

	requests: {
		user: 'getUser',
		isAuthenticated: 'isAuthenticated',
		login: 'login'
	},

	isAuthenticated () {
		var _self = this;

		return new Promise(function(resolve, reject) {
			if(null !== _self.model.get('customer')) {
				resolve(_self.model.get('authenticated'));
			} else {
				_self.model.fetch({
		      'success': (model)=> {
		      	resolve(model.get('authenticated'))
		      },
		      'error': (err) => {
		      	reject(err);
		      }
		    });	
			}
		});
		
	},

	login (code) {
		var _self = this;

		return new Promise(function(resolve, reject) {

			$.get('/api/v2/user/login/' + code, function(userAttributes) {

				_self.model.set(userAttributes);

				console.log(_self.model);

				userChannel.trigger('user:login', userAttributes);

				resolve(userAttributes.authenticated);

			});

		});
		
	},

	/*
		getUser
		returns current user in session
	*/
	getUser () {
		console.log('hallo');
		
	},

	/*
		updateUser
		updates user information
	*/
	updateUser(userData) {

	}

});

export default new UserService();