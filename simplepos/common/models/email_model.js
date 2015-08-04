Email=Astro.Class({
	name: 'Email',
	collection: Emails,
	fields: {
		name: {
			type: 'string',
			default: '',		
		},
		email: {
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
		email: [
			Validators.required(),
			Validators.email(),
			Validators.maxLength(60,'At most 60 characters!')
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

