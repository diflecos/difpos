Currencies           =new Mongo.Collection("currencies");
Brands               =new Mongo.Collection("brands");
RegionalStoreNetworks=new Mongo.Collection("regional_store_networks");
Taxes                =new Mongo.Collection("taxes");
Companies            =new Mongo.Collection("companies");
Stores               =new Mongo.Collection("stores");
Sessions             =new Mongo.Collection("sessions"); // no confundir con la Session del navegador
Orders               =new Mongo.Collection("orders");
CashFlows            =new Mongo.Collection("cashflows");
CashChecks           =new Mongo.Collection("cashchecks");
SpecialOffers        =new Mongo.Collection("special_offers");
Categories           =new Mongo.Collection("categories");
FullPersons          =new Mongo.Collection("fullpersons");


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