Template.editComponent.helpers({
	'photo': function() {
		//var id = document.getElementById("editComponent").dataset.id;
		//return Session.get('photo');
		console.log("this.image", this.image);
		return Images.findOne({_id: this.image});
	},
	'allPhotos': function() {
		//var id = document.getElementById("editComponent").dataset.id;
		// var component = SurplusComponents.findOne({_id: id})
		// return Images.find(_id: component.image);
		return Images.find();
	},
	component: function() {
		//console.log("this", this);
		//console.log("Component: ", SurplusComponents.findOne({_id: this._id}));
		return SurplusComponents.findOne({_id: this._id});
	},
	componentFromApi: function () {
		var component = Meteor.call('getSurplusComponent', this.componentId);

		//console.log("helper" , component);
		
	 },
	selectCategory: function(category) {
		if(category === this.category){
			return 'selected';
		}

	},

});

Template.editComponent.events({
	"submit .edit-component": function (event) {
		event.preventDefault();
		var id = document.getElementById("editComponent").dataset.id;
		console.log(id);


		var componentInfo = {
								name: event.target.compName.value,
								partNumber: event.target.compPartNum.value,
								category: event.target.compCat.value,
								manufacturer: event.target.compMan.value,
								description: event.target.compDescription.value
							};

		//update Mongo Database
		SurplusComponents.update({_id: id}, {$set: componentInfo});

		
		//Update item in API
		Meteor.call('updateSurplusComponent', document.getElementById("editComponent").dataset.apicomponentid , componentInfo, function(err, response){
			if(err){
				console.log("error");
			}
			else {
				Router.go('/componentDetail/'+id);

			}
		});
	},

	'click #deleteComponent': function(event) {
		event.preventDefault();
		var id = document.getElementById("editComponent").dataset.id;
		Meteor.call('deleteSurplusComponent', document.getElementById("editComponent").dataset.apicomponentid, id, function(err, response){
			if(err) {
				console.log("error");
			}
			else {
				Router.go('/');
			}
		});	
	},

	'click .capture': function() {
		MeteorCamera.getPicture({width: 100, height: 100}, function(error, data) {
			Session.set('photo', data);
			var id = document.getElementById("editComponent").dataset.id;
			Session.set(id, data);

			//save image in database
			Images.insert(data, function (err, fileObj)  {
				if (err) {
					console.log("error saving picture to database");
				}
				else {
					var id = document.getElementById("editComponent").dataset.id;
					console.log("adding image to ", id);
					var imagesURL = {
						// "image": "localhost:3000/cfs/files/images/" + fileObj._id
						"image": fileObj._id
					};
					SurplusComponents.update({_id: id}, {$set: imagesURL});
				}
			});
		});
	}
});