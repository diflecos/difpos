Currency=Astro.Class({
	name: 'Currency',
	collection: Currencies,
	fields: {
		name: {
			type: 'string',	
		},
		shortname: {
			type: 'string',	
		},
		symbol: {
			type: 'string',	
		},
		precision: {   // Para el euro  2 
			type: 'number',	
		},
		bills: { // bills: array of possible values of bills for the currency (expressed in cents). Example for Euro: [50000,20000,10000,5000,2000,1000,500]
			type: 'array',			
		},
		coins: { // coins: similar to bills
			type: 'array',
		},	
	},
	behaviors: ['audit_trail'],	
	init: function (attrs) {  // Constructor   
		alert('Creating instance!');
		this.set('name',attrs.name);
		this.set('shortname',attrs.shortname);
		this.set('symbol',attrs.symbol);
		this.set('precision',attrs.precision);
		this.set('bills',attrs.bills);
		this.set('coins',attrs.coins);
	},	
	methods: {
		/* 
		Converts a money amount expressed as a floating point number to the corresponding number of cents: 12,95 --> 1295 cents 
		Takes into account the precision parameter defined for the currency
		*/
		convertDB: function(moneyUI) {
			if(moneyUI!=undefined && moneyUI>=0) {
				var factor=Math.pow(10,this.precision);   // 2 --> 100,  3 --> 1000
				return Math.round(parseInt(moneyUI)*factor);
			} else {
				throw new Error('Currency.convertDB(moneyUI) cannot convert a negative or undefined amount');
			}
		},
		/* 
		Converts a money amount expressed as an integer number of cents to the corresponding floating point number of euros: 1295 --> 12,95
		Takes into account the precision parameter defined for the currency
		*/
		convertUI: function(moneyDB) {
			if(moneyDB!=undefined && moneyDB>=0) {
				var factor=Math.pow(10,this.precision);   // 2 --> 100,  3 --> 1000
				var moneyUI=parseInt(moneyDB)/factor;
				return moneyUI.toFixed(this.precision);	
			} else {
				throw new Error('Currency.convertUI(moneyDB) cannot convert a negative or undefined amount');
			}
		},
		convertUISymbol: function(moneyDB) {
			return this.convertUI(moneyDB)+this.symbol;
		},
		zeroUI: function() {
			return this.convertUISymbol(0);
		},
		toString: function() {
			return this.name+' - '+this.shortname+' - '+this.symbol;
		}		
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3, 'At least 3 character!'),
			Validators.maxLength(20, 'At most 20 characters!'),
		],
		shortname: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3, 'At least 3 character!'),
			Validators.maxLength(20, 'At most 20 characters!'),		
		],
		symbol: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(1, 'At least 1 character!'),
			Validators.maxLength(5, 'At most 5 characters!'),		
		],
		precision: [
			Validators.required(),
			Validators.number(),
			Validators.gte(0),
		],
		bills: [
			Validators.required(),
			Validators.array(),
			Validators.minLength(1, 'Provide at least one bill type'),
			Validators.minLength(25, 'Provide at most 25 bill types'),
		],
/* 		bills.$: [
			Validators.number(),
			Validators.gt(0),
		], */
		coins: [
			Validators.required(),
			Validators.array(),
			Validators.minLength(1, 'Provide at least one coin type'),
			Validators.minLength(25, 'Provide at most 25 coin types'),
		],
/* 		coins.$: [
			Validators.number(),
			Validators.gt(0),
		], */
	}
});



