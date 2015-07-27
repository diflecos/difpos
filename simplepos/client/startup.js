Meteor.startup(function () {
	currentStore=localStorage.getItem("currentStore");
	store=new Store(EJSON.parse(currentStore));
	
	currentCompany=localStorage.getItem("currentCompany");
	company=new Company(EJSON.parse(currentCompany));	
	company.tax_address=new Address(EJSON.parse(company.tax_address));
});