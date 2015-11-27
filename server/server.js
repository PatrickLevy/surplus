Meteor.startup(function () {
  //Enables mobile to perform api calls???
  BrowserPolicy.content.allowOriginForAll("http://meteor.local");
  BrowserPolicy.content.allowOriginForAll("http://159.203.93.175:3000");
  BrowserPolicy.content.allowOriginForAll("http://159.203.93.175:3000");
  BrowserPolicy.content.allowOriginForAll("http://svcs.ebay.com");
  BrowserPolicy.content.allowOriginForAll('*.ebaystatic.com');
  BrowserPolicy.content.allowOriginForAll('http://localhost:3000');
  //BrowserPolicy.content.allowOriginForAll('blob:http://localhost:3000');
  BrowserPolicy.content.allowDataUrlForAll();
  BrowserPolicy.content.allowOriginForAll('blob:');

   http://localhost:3000

  
  //remove all items from mongo database
  SurplusComponents.remove({});

  //GET items from remote database
  try {
      var response = HTTP.call("GET", "http://159.203.93.175:3000/api/components/", {
        //params: {q: query}
      
      });

      _.each(response.data, function(component) {
        var doc = {
          apiComponentId: component._id,
          category: component.category,
          description: component.description,
          manufacturer: component.manufacturer,
          name: component.name,
          partNumber: component.partNumber
        };
        //Add to database
        SurplusComponents.insert(doc);
      });
    

  }catch(error) {
        console.log(error);
        }

});


 // //Create mongo database on server 
 //  ApiSurplusComponents = new Mongo.Collection('apiSurplusComponents');
 
 //  //Publish API Call for all components
 //  Meteor.publish('apiSurplusComponents', function(){
     
 //     //Delete all previous records from database so that they can be repopulated with records from api
 //     ApiSurplusComponents.remove({});

 //    var self = this;
 //    try {
 //      var response = HTTP.call("GET", "http://159.203.93.175:3000/api/components/", {
 //        //params: {q: query}
      
 //      });

 //      _.each(response.data, function(component) {
 //        var doc = {
 //          apiComponentId: component._id,
 //          category: component.category,
 //          description: component.description,
 //          manufacturer: component.manufacturer,
 //          name: component.name,
 //          partNumber: component.partNumber
 //        };

 //        //inform subscriber that a new component was added
 //        //adds items to collection?
 //        //console.log("doc");
 //        //console.log(doc);
 //        self.added('apiSurplusComponents', Random.id(), doc)
 //      });

 //      //inform subscriber that all data has been sent
 //      self.ready();
 //    } catch(error) {
 //          console.log(error);
 //        }
 
 //  });

  Meteor.methods({

  	//API call to get all surplus components
  	getAllSurplusComponents: function () {
  		//check(userId, String);
  		this.unblock();
  		try {
    		var result = HTTP.call("GET", "http://159.203.93.175:3000/api/components/");
    		return result;
  		} catch (e) {
    		// Got a network error, time-out or HTTP error in the 400 or 500 range.
    		return false;
  		}

	},

	//API call to get a particular surplus components
	getSurplusComponent: function (componentId) {
  		//check(userId, String);
  		this.unblock();
  		var urlstring = 'http://159.203.93.175:3000/api/components/' + componentId;
  		try {
    		var result = HTTP.call("GET", urlstring,
    								{params: {_id: "562db4761106fcc8636b9ac7"}});	
    		return result;
  		} catch (e) {
    		// Got a network error, time-out or HTTP error in the 400 or 500 range.
    		return false;
  		}
  	},

  //API call to get all suppliers
  getAllSuppliers: function () {
      //check(userId, String);
      this.unblock();
      try {
        var result = HTTP.call("GET", "http://159.203.93.175:3000/api/suppliers/");
        return result;
      } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
      }

    },

  //API call to get a particular surplus components
  getSupplier: function (supplierId) {
      //check(userId, String);
      this.unblock();
      var urlstring = 'http://159.203.93.175:3000/api/suppliers/' + supplierId;
      try {
        var result = HTTP.call("GET", urlstring); 
        return result;
      } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
      }
    },

  //API call to post a new component
  postComponent: function (component) {
      //check(userId, String);
      this.unblock();
      try {
        var result = HTTP.call("POST", "http://159.203.93.175:3000/api/components/",
                      //{params: {name: supplier.name }});
                      {params: component});
        return result;
      } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
      }

    },

  //API call to post a new supplier
  postSupplier: function (supplier) {
      //check(userId, String);
      this.unblock();
      try {
        var result = HTTP.call("POST", "http://159.203.93.175:3000/api/suppliers/",
                      //{params: {name: supplier.name }});
                      {params: supplier});
        return result;
      } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
      }

    },

  //API call to update a particular surplus component
  updateSurplusComponent: function (componentId, component) {
      //check(userId, String);
      this.unblock();
      console.log(componentId);
      console.log(component);

      var urlstring = 'http://159.203.93.175:3000/api/components/' + componentId;
      try {
        var result = HTTP.call("PUT", urlstring,
                    {params: component}); 
        return result;
      } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
      }
    },

  //API call to delete a particular surplus component
  deleteSurplusComponent: function (componentId, id) {
      //check(userId, String);

      //remove from local mongo database
      console.log("removing from mongo id: ", id);
      SurplusComponents.remove({_id: id});

      //Delete from external API Source
      this.unblock();
      console.log("Deleting ", componentId);

      var urlstring = 'http://159.203.93.175:3000/api/components/' + componentId;
      try {
        
        //remove from external api database
        var result = HTTP.call("DELETE", urlstring);
        return result;
      } catch (e) {
        // Got a network error, time-out or HTTP error in the 400 or 500 range.
        return false;
      }
    },

  getEbayMatches: function(keywords) {
    var keywordString = "&keywords=";
    // _.each(keywords, function(keyword) {
    //   keywordString += keyword;
    //   keywordString += "%20";
    // });
    keywordString += "(";
    keywordString += keywords[0];
    for (var i = 1; i < keywords.length; i++){
      keywordString += ",";
      keywordString += keywords[i];
    }
    keywordString += ")"
    
    console.log("keywordString", keywordString);

    var url = "http://svcs.ebay.com/services/search/FindingService/v1";
          url += "?OPERATION-NAME=findItemsByKeywords";
          url += "&SERVICE-VERSION=1.0.0";
          url += "&SECURITY-APPNAME=PatrickL-9a3c-4727-a202-ce4e6cb5606f";
          url += "&GLOBAL-ID=EBAY-US";
          url += "&RESPONSE-DATA-FORMAT=JSON";
          //url += "&callback=_cb_findItemsByKeywords";
          url += "&REST-PAYLOAD";
          //url += "&keywords=harry%20potter";
          url += keywordString;
          url += "&paginationInput.entriesPerPage=10";
          //url += "&descriptionSearch=true";
    try {
      var result = HTTP.call("GET", url);
      return result;
    } catch (e) {
      //Got an error
      return false;
    }
  }

  });






