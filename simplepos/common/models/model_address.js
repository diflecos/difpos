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
	}
});

