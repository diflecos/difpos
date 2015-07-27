Meteor.startup(function () {
	currentStore=localStorage.getItem("currentStore");
	store=new Store(EJSON.parse(currentStore));
});