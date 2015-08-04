Phone=Astro.Class({
	name: 'Phone',
	collection: Phones,
	fields: {
		name: {
			type: 'string',
			default: '',		
		},
		prefix: {
			type: 'string',	
		},
		nbr: {
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
		prefix: [
			Validators.required(),
			Validators.string(),
			Validators.maxLength(20,'At most 20 characters!')
		],
		nbr: [
			Validators.required(),
			Validators.string(),
			Validators.maxLength(5,'At least 5 characters!'),
			Validators.maxLength(20,'At most 20 characters!')
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

