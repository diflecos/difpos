FullPersons = new Mongo.Collection("fullpersons");
FullPersons.attachSchema(Schemas.FullPerson);



FullPersonsPages = new Meteor.Pagination(FullPersons, {
	perPage: 5, 
	itemTemplate: "fullpersons_item_template",
	divWrapper: false, 
	availableSettings: {filters: true, sort: true}
});

PersonImages = new FS.Collection("person_images", {
  stores: [new FS.Store.FileSystem("person_images", {path: "C:\\Users\\Antuan\\Desktop\\difpos\\simplepos\\uploads\\"})]
});