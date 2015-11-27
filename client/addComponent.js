Template.addComponent.helpers({
	// 'photo': function() {
	// 	return Session.get('photo');
	// }
});

Template.addComponent.events({
	"submit .new-component": function (event) {
		event.preventDefault();

		var componentInfo = {
								name: event.target.compName.value,
								partNumber: event.target.compPartNum.value,
								category: event.target.compCat.value,
								manufacturer: event.target.compMan.value,
								description: event.target.compDescription.value
							}
		//Add component to external api data source
		Meteor.call('postComponent', componentInfo, function(err, response){
			if(err){
				throw error;
			}
			else {
				
				//Add component to local mongo database
				SurplusComponents.insert({ 	apiComponentId: response.data._id,
											name: response.data.name,
											partNumber: response.data.partNumber,
											category: response.data.category,
											manufacturer: response.data.manufacturer,
											description: response.data.partNumber });
				
				var newComponent = SurplusComponents.find({apiComponentId: response.data._id}).fetch();
				// console.log(newComponent[0]._id);
				// console.log("part added: ", response);

				//Router.go('/'+newComponent[0]._id);
				Router.go('/componentDetail/'+newComponent[0]._id);
			}
		});


	},

	'click .capture': function() {
	// 	MeteorCamera.getPicture({}, function(error, data) {
	// 		Session.set('photo', data);
	// 	});
	 }
});