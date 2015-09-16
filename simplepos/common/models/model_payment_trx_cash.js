PaymentTrxCash=PaymentTrx.extend({
	name: 'PaymentTrxCash',
	fields: {
		given: {
			type: 'number',
		},
	},
	init: function (attrs) {  // Constructor
		this.set('operationId',attrs.operationId);
		this.set('amount',attrs.amount);
		this.set('currencyId',attrs.currencyId);

		this.set('given',attrs.given);
	},		
	methods: {
		returned: function() {
			var to_be_returned=this.given-this.amount;
			return to_be_returned>0?to_be_returned:0;
		},
		details: function() {
			return 'Paid: '+this.currency().convertUISymbol(this.amount)+' [Given: '+this.currency().convertUISymbol(this.given)+', Returned: '+this.currency().convertUISymbol(this.returned())+']';
		},
	},
	validators: {
		given: [
			Validators.required(),
			Validators.number(),
			Validators.gte(0),
		],	
	}
});

