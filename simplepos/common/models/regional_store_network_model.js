RegionalStoreNetwork=Astro.Class({
	name: 'RegionalStoreNetwork',
	collection: RegionalStoreNetworks,
	fields: {
		brandId: {
			type: 'string',
		},
		companyId: {
			type: 'string',
		},
		name: {
			type: 'string',	
		},
		taxId: {
			type: 'string',	
		},
		currencyId: {
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
		brand: {
			type: 'one',
			class: 'Brand',
			local: 'brandId',
			foreign: '_id'
		},
		tax: {
			type: 'one',
			class: 'Tax',
			local: 'taxId',
			foreign: '_id'			
		},
		currency: {
			type: 'one',
			class: 'Currency',
			local: 'currencyId',
			foreign: '_id'			
		},
		company: {
			type: 'one',
			class: 'Company',
			local: 'companyId',
			foreign: '_id'			
		},
	},	
	methods: {

	},
	validators: {
		brandId: [
			Validators.required(),
			Validators.string(),
		],
		companyId: [
			Validators.required(),
			Validators.string(),
		],
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5, 'At least 5 character!'),
			Validators.maxLength(30, 'At most 30 character!')
		],
		taxId: [
			Validators.required(),
			Validators.string(),
		],
		currencyId: [
			Validators.required(),
			Validators.string(),
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
