Tax=function Tax(name,percentage) {
	this.name=name;
	this.percentage=percentage;
}

Tax.prototype.calculate=function(amountDB) {
	return Math.round((this.percentage*amountDB)/100);
}

