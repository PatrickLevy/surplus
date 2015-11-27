Template.navbar.helpers({

});

Template.navbar.events({
  'click .btn': function(){
    Router.go("/surplusComponents");
  }
});