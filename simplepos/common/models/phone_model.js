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
	},
	behaviors: ['audit_trail'],	
	methods: {

	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5, 'At least 5 character!')
		],
		prefix: [
			Validators.string(),
			Validators.maxLength(20,'At most 20 characters!')
		],
		nbr: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5,'At least 5 characters!'),
			Validators.maxLength(20,'At most 20 characters!')
		],
	}
});

