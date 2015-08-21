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
	},
	behaviors: ['audit_trail'],	
	methods: {
		display: function() {
			return this.email;
		}
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
	}
});

