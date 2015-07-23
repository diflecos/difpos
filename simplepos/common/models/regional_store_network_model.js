RegionalStoreNetwork=function RegionalStoreNetwork(brand,company,name,tax,currency) {
	this.regionalStoreNetworkId;
	this.brand=brand;
	this.company=company;
	this.name=name;
	this.tax=tax;
	this.currency=currency;
}

RegionalStoreNetwork.prototype.save=function(callback) {
	Meteor.call('regionalStoreNetworkAdd',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		this.regionalStoreNetworkId=result;
		callback();
	});		
}

RegionalStoreNetwork.prototype.remove=function(callback) {
	Meteor.call('regionalStoreNetworkRemove',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		callback();
	});		
}
