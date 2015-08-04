Address=Astro.Class({
	name: 'Address',
	collection: Addresses,
	fields: {
		name: {
			type: 'string',
			default: '',		
		},
		street: {
			type: 'string',	
		},
		town: {
			type: 'string',	
		},
		zipcode: {
			type: 'string',	
		},
		country: {
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
	methods: {

	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5, 'At least 5 character!')
		],
		street: [
			Validators.required(),
			Validators.string(),
			Validators.maxLength(60,'At most 60 characters!')
		],
		town: [
			Validators.required(),
			Validators.string(),
			Validators.maxLength(60,'At most 60 characters!')
		],
		zipcode: [
			Validators.required(),
			Validators.string(),
			Validators.maxLength(20,'At most 20 characters!')
		],
		country: [
			Validators.required(),
			Validators.string(),
			Validators.maxLength(30,'At most 30 characters!')
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

