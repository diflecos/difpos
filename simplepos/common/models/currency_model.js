/*
zeroUI: this field contains the value of 0 expressed appropriately in the currency, ready to be shown in the UI
bills: array of possible values of bills for the currency (expressed in cents). Example for Euro: [50000,20000,10000,5000,2000,1000,500]
coins: similar to bills

*/
Currency=function Currency(currency) {  // currency debe ser un objeto con los siguientes campos: name,shortname,symbol,precision,bills,coins
	this.name=currency.name;
	this.shortname=currency.shortname;
	this.symbol=currency.symbol;
	this.precision=parseInt(currency.precision);
	this.zeroUI=this.convertUI(0);
	this.bills=currency.bills;  
	this.coins=currency.coins;
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
