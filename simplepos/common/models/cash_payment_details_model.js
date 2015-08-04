CashPaymentDetails=Astro.Class({
	name: 'CashPaymentDetails',
	fields: {
		currencyId: {
			type: 'string',	
		},
		given: {     
			type: 'number',	
		},
		cashed: {
			type: 'number',	
		},
		returned: {
			type: 'number',	
		},	
	},
	relations: {
		currency: {
			type: 'one',
			class: 'Currency',
			local: 'currencyId',
			foreign: '_id'			
		},
	},		
	methods: {
		displayShort: function() {
			return "["+this.currency.convertUI(this.given)+"-"+this.currency.convertUI(this.returned)+"]";
		},
		displayLong: function() {
			return "[Given: "+this.currency.convertUI(this.given)+", Returned: "+this.currency.convertUI(this.returned)+"]";
		}		
	},
	validators: {
		currencyId: Validators.required(),
		given: Validators.required(),
		cashed: Validators.string(), 
		returned: Validators.string(),
	}
});



