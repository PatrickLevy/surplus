

Template.componentDetail.helpers({
	component: function() {
			//console.log(SurplusComponents.findOne({_id: this._id}));
			console.log(this);
			//console.log(SurplusComponents.findOne({apiComponentId: this._id}));
			
			//return SurplusComponents.findOne({_id: this._id});
			//return SurplusComponents.findOne({apiComponentId: this._id});
			return SurplusComponents.findOne({_id: this._id});
	},
	componentFromApi: function () {
		var component = Meteor.call('getSurplusComponent', this.componentId);

		console.log("helper" , component);
		
	 },
	 ebaySearchResults: function (keywords) {
	    // Parse the response and build an HTML table to display search results
	    keywords= [];
	    keywords = this.name.split(" ");
	    //keywords.push(this.name);
	    keywords.push(this.partNumber);
	    keywords.push(this.manufacturer);
	    
	    //keywords.push("pg71");
	    //keywords.push("gearmotor");

	    console.log("keywords for ebay search", keywords);

	    Meteor.call('getEbayMatches', keywords, function(error, response){
	    	if(error){
	    		console.log("error getting ebay matches");
	    	}
	    	else {
	    		//console.log("ebay response: ", response.content);
	    		var responseObject = JSON.parse(response.content);
	    		console.log("responseObject", responseObject);

	    		var items = responseObject.findItemsByKeywordsResponse[0].searchResult[0].item || [];
	      		var html = [];
	      		html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
	      		for (var i = 0; i < items.length; ++i) {
	        		var item     = items[i];
	        		console.log("item " , item);
	        		var title    = item.title;
	        		var pic      = item.galleryURL;
	        		var viewitem = item.viewItemURL;
	        		if (null != title && null != viewitem) {
	          			html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' + '</tr>' + '<tr>' +
	          			'<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
	        		}
	      		}
	      		html.push('</tbody></table>');
	      		document.getElementById("results").innerHTML = html.join("");
	      		//return html;
	    	}
	    });

	    // function _cb_findItemsByKeywords(root) {
	    //   var items = root.findItemsByKeywordsResponse[0].searchResult[0].item || [];
	    //   var html = [];
	    //   html.push('<table width="100%" border="0" cellspacing="0" cellpadding="3"><tbody>');
	    //   for (var i = 0; i < items.length; ++i) {
	    //     var item     = items[i];
	    //     var title    = item.title;
	    //     var pic      = item.galleryURL;
	    //     var viewitem = item.viewItemURL;
	    //     if (null != title && null != viewitem) {
	    //       html.push('<tr><td>' + '<img src="' + pic + '" border="0">' + '</td>' +
	    //       '<td><a href="' + viewitem + '" target="_blank">' + title + '</a></td></tr>');
	    //     }
	    //   }
	    //   html.push('</tbody></table>');
	    //   document.getElementById("results").innerHTML = html.join("");
	    // }  // End _cb_findItemsByKeywords() function

	    // Construct the request
	    // Replace MyAppID with your Production AppID
	    // var url = "http://svcs.ebay.com/services/search/FindingService/v1";
	    //     url += "?OPERATION-NAME=findItemsByKeywords";
	    //     url += "&SERVICE-VERSION=1.0.0";
	    //     url += "&SECURITY-APPNAME=PatrickL-9a3c-4727-a202-ce4e6cb5606f";
	    //     url += "&GLOBAL-ID=EBAY-US";
	    //     url += "&RESPONSE-DATA-FORMAT=JSON";
	    //     url += "&callback=_cb_findItemsByKeywords";
	    //     url += "&REST-PAYLOAD";
	    //     url += "&keywords=harry%20potter";
	    //     url += "&paginationInput.entriesPerPage=3";

	    // Submit the request
	    // s=document.createElement('script'); // create script element
	    // s.src= url;
	    // document.body.appendChild(s);

		 }
});

Template.componentDetail.events({
	// 'click #delete': function(event) {
	// 	console.log("Delete: ", this);

		
	// }
});