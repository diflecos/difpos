CashPaymentDetails=function CashPaymentDetails(given,cashed) {
	this.given=given;
	this.cashed=cashed;
	this.returned=given-cashed;
}
