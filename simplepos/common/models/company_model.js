Company=function Company(tax_nbr,tax_name,tax_address,commercial_name,logo) {
	this.companyId;
	this.tax_nbr=tax_nbr;
	this.tax_name=tax_name;
	this.tax_address=tax_address;
	this.commercial_name=commercial_name;
	this.logo=logo;
}

Company.prototype.save=function(callback) {
	Meteor.call('companyAdd',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		this.companyId=result;
		callback();
	});		
}

Company.prototype.remove=function(callback) {
	Meteor.call('companyRemove',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		callback();
	});		
}
