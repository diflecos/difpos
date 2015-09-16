PaymentTrx=Astro.Class({
	name: 'PaymentTrx',
	collection: PaymentTrxs,
	fields: {
		operationId: {
			type: 'string',
		},
		amount: {
			type: 'number',
		},
		currencyId: {
			type: 'string',
		},
	},
	behaviors: ['audit_trail'],	
	methods: {
		operation: function() {
			return Operations.findOne(this.operationId);
		},
		currency: function() {
			return Currencies.findOne(this.currencyId);
		}
	},
	validators: {
		operationId: [
			Validators.required(),
			Validators.string(),
		],
		amount: [
			Validators.required(),
			Validators.number(),
			Validators.gte(0),
		],
		currencyId: [
			Validators.required(),
			Validators.string(),
		],	
	}
});

