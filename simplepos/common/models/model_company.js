Company=Astro.Class({
	name: 'Company',
	collection: Companies,
	fields: {
		currencyId: {
			type: 'string',
		},
		taxNbr: {
			type: 'string',
		},
		taxName: {
			type: 'string',	
		},
		taxAddressId: {
			type: 'string',	
		},
		commercialName: {
			type: 'string',	
		},
		logo: {
			type: 'string',	
		},	
	},
	behaviors: ['audit_trail'],	
	relations: {
		currency: {
			type: 'one',
			class: 'Currency',
			local: 'currencyId',
			foreign: '_id'			
		},
		taxAddress: {
			type: 'one',
			class: 'Address',
			local: 'taxAddressId',
			foreign: '_id'			
		},
	},		
	methods: {

	},
	validators: {
		currencyId: [
			Validators.required(),
			Validators.string(),
		],
		taxNbr: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3, 'At least 3 character!'),
			Validators.maxLength(20, 'At most 20 character!'),				
		],
		taxName: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3, 'At least 3 character!'),
			Validators.maxLength(20, 'At most 20 character!'),		
		],
		taxAddressId: [
			Validators.required(),
			Validators.string(),
		],
		commercialName: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3, 'At least 3 character!'),
			Validators.maxLength(20, 'At most 20 character!'),		
		],
		logo: [
			Validators.maxLength(20, 'At most 200 character!'),
		],		
	}
});

