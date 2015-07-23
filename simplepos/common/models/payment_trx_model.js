PaymentTrx=function PaymentTrx(payment_trx) {   // payment_trx debe tener los siguientes campos: type,paid,details
	this.paymentTrxId;
	this.type=payment_trx.type;
	this.paid=parseInt(payment_trx.paid);
	this.details=payment_trx.details;
}


PaymentTrx.prototype.save=function(callback) {
	Meteor.call('paymentTrxAdd',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		this.paymentTrxId=result;
		callback();
	});		
}

PaymentTrx.prototype.remove=function(callback) {
	Meteor.call('paymentTrxRemove',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		callback();
	});		
}