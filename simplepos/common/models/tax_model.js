Tax=Astro.Class({
	name: 'Tax',
	collection: Taxes,
	fields: {
		name: {
			type: 'string',
			default: '',		
		},
		percentage: {
			type: 'object',	
		},	
	},
	behaviors: ['audit_trail'],	
	methods: {
		calculate: function(amountDB) {
			return Math.round((this.percentage*amountDB)/100);
		}
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5, 'At least 5 character!')
		],
		percentage: [
			Validators.required(),
			Validators.number(),
			Validators.gt(0),
		],
	}
});



