Router.route('/addComponent');

Router.route('/editComponent/:_id', function() {
	this.render('editComponent', {
		data: function() {
			return {_id: this.params._id};
		}
	});
});

Router.route('/componentDetail/:_id', function() {
	this.render('componentDetail', {
		data: function() {
			return {_id: this.params._id};
		}
	});
});

Router.route('/surplusComponents', {
	name: 'surplusComponents',
	template: 'surplusComponents'
});

Router.route('/', {
	name: 'home',
	template: 'home'
});

Router.route('/about', {
	name: 'about',
	template: 'about'
});

