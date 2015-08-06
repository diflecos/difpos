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
		currencyId: Validators.required(),
		taxNbr: Validators.required(),
		taxName: Validators.required(),
		taxAddressId: Validators.required(),
		commercialName: Validators.required(),
		logo: Validators.required(),
	}
});

