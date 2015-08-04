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
		createdAt: {
			type: 'date',	
		},
		udpatedAt: {
			type: 'date',		
		},
		createdBy: {
			type: 'string',
		},
		updatedBy: {
			type: 'string',	
		},		
	},
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
		createdAt: [
			Validators.required(),
			Validators.date(),
		],
		updatedAt: [
			Validators.required(),
			Validators.date(),
		],
		createdBy: [
			Validators.required(),
			Validators.date(),
		],
		updatedBy: [
			Validators.required(),
			Validators.date(),
		],
	}
});



