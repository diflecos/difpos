FullPersons = new Mongo.Collection("fullpersons");



FullPersonsPages = new Meteor.Pagination(FullPersons, {
	perPage: 5, 
	itemTemplate: "fullpersons_item_template",
	divWrapper: false, 
	availableSettings: {filters: true, sort: true}
});

