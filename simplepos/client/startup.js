Meteor.startup(function () {
	currentStore=localStorage.getItem("currentStore");
	store=new Store(EJSON.parse(currentStore));
	
	currentCompany=localStorage.getItem("currentCompany");
	company=new Company(EJSON.parse(currentCompany));	
	company.tax_address=new Address(EJSON.parse(company.tax_address));
	
	navigation=new Navigation();
	
	console.log('startup!!')
	/*********************** i18n **********************************/
    Session.set("showLoadingIndicator", true);
	TAPi18n.setLanguage(PARAMS.DEFAULT_LANG).done(function () {
		Session.set("showLoadingIndicator", false);
	}).fail(function (error_message) {
		// Handle the situation
		console.log(error_message);
	});
	/*********************** i18n **********************************/
});