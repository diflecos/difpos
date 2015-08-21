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
			default: '',
		},
		town: {
			type: 'string',	
			default: '',
		},
		zipcode: {
			type: 'string',	
			default: '',
		},
		country: {
			type: 'string',	
			default: '',
		},	
	},
	behaviors: ['audit_trail'],
	methods: {
		toString: function() {
			return this.name+': '+this.street+' - '+this.town+' ('+this.zipcode+') - '+this.country;
		}
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.maxLength(20,'At most 20 characters!')
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
			Validators.maxLength(30,'At most 30 characters!'),
			Validators.choice(VALUES.COUNTRY);
		],
	}
});

