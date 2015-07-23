Brand=function Brand(name,logo,url,email,phone) {
	this.brandId;
	this.name=name;
	this.logo=logo;
	this.url=url;
	this.email=email;
	this.phone=phone;
}

Brand.prototype.save=function(callback) {
	Meteor.call('brandAdd',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		this.brandId=result;
		callback();
	});		
}

Brand.prototype.remove=function(callback) {
	Meteor.call('brandRemove',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		callback();
	});		
}
