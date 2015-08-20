Social=Astro.Class({
	name: 'Social',
	collection: Socials,
	fields: {
		name: {
			type: 'string',
			default: '',		
		},
		value: {
			type: 'string',	
		},
	},
	behaviors: ['audit_trail'],	
	methods: {
		display: function() {
			return this.name+': '+this.value;
		}
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3, 'At least 3 character!'),
			Validators.maxLength(100,'At most 100 characters!')
		],
		value: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3,'At least 3 characters!'),
			Validators.maxLength(250,'At most 250 characters!')
		],
	}
});

