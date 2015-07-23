Tax=function Tax(tax) {  // tax es un objeto con estos campos: name,percentage
	this.taxId;
	this.name=tax.name;
	this.percentage=tax.percentage;
}

Tax.prototype.calculate=function(amountDB) {
	return Math.round((this.percentage*amountDB)/100);
}

Tax.prototype.save=function(callback) {
	Meteor.call('taxAdd',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		this.taxId=result;
		callback();
	});		
}

Tax.prototype.remove=function(callback) {
	Meteor.call('taxRemove',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		callback();
	});		
}