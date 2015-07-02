AmountDiscount=function AmountDiscount(name,amount) {
	this.name=name;
	this.amount=amount;
	this.display="-"+store.currency.convertUI(this.amount);
}

AmountDiscount.prototype.getDiscountedPrice=function(priceDB) {
	return priceDB-this.amount;
}

PercentageDiscount=function PercentageDiscount(name,percentage) {
	this.name=name;
	this.percentage=percentage;
	this.display="-"+this.percentage+"%";
}

PercentageDiscount.prototype.getDiscountedPrice=function(priceDB) {
	return Math.round(priceDB*(1-this.percentage/100));
}