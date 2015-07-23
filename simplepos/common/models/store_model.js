Store=function Store(store) {  // store debe ser un objeto con los siguientes campos:  name,currency,address,phone
	this.storeId;
	this.name=store.name;
	this.currency=new Currency(store.currency);
	this.address=new Address(store.address);
	this.phone=store.phone;
}


Store.prototype.save=function(callback) {
	Meteor.call('storeAdd',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		this.storeId=result;
		callback();
	});		
}

Store.prototype.remove=function(callback) {
	Meteor.call('storeRemove',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		callback();
	});		
}
