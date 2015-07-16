Currency=function Currency(name,shortname,symbol,precision) {
	this.name=name;
	this.shortname=shortname;
	this.symbol=symbol;
	this.precision=parseInt(precision);
	this.zeroUI=this.convertUI(0);
}

/* 
Converts a money amount expressed as a floating point number to the corresponding number of cents: 12,95 --> 1295 cents 
Takes into account the precision parameter defined for the currency
*/
Currency.prototype.convertDB=function(moneyUI) {
	if(moneyUI!=undefined && moneyUI>=0) {
		var factor=Math.pow(10,this.precision);   // 2 --> 100,  3 --> 1000
		return Math.round(parseInt(moneyUI)*factor);
	} else {
		throw new Error("Currency.convertDB(moneyUI) cannot convert a negative or undefined amount");
	}
}

/* 
Converts a money amount expressed as an integer number of cents to the corresponding floating point number of euros: 1295 --> 12,95
Takes into account the precision parameter defined for the currency
*/
Currency.prototype.convertUI=function(moneyDB) {
	if(moneyDB!=undefined && moneyDB>=0) {
		var factor=Math.pow(10,this.precision);   // 2 --> 100,  3 --> 1000
		var moneyUI=parseInt(moneyDB)/factor;
		return moneyUI.toFixed(this.precision);	
	} else {
		throw new Error("Currency.convertUI(moneyDB) cannot convert a negative or undefined amount");
	}
}

Currency.prototype.convertUISymbol=function(moneyDB) {
	return this.convertUI(moneyDB)+this.symbol;
}
