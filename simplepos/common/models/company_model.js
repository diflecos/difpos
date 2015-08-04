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

