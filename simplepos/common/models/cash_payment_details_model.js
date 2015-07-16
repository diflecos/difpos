CashPaymentDetails=function CashPaymentDetails(currency,givenDB,cashedDB) {
	this.currency=currency;
	this.given=parseInt(givenDB);
	this.cashed=parseInt(cashedDB);
	this.returned=this.given-this.cashed;
}

CashPaymentDetails.prototype.displayShort=function() {
	return "["+this.currency.convertUI(this.given)+"-"+this.currency.convertUI(this.returned)+"]";
}

CashPaymentDetails.prototype.displayLong=function() {
	return "[Given: "+this.currency.convertUI(this.given)+", Returned: "+this.currency.convertUI(this.returned)+"]";
}
