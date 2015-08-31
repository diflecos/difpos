Phone=Astro.Class({
	name: 'Phone',
	collection: Phones,
	fields: {
		name: {
			type: 'string',
			default: PARAMS.PHONE_DEFAULT_NAME,		
		},
		prefix: {
			type: 'string',	
			default: PARAMS.PHONE_DEFAULT_PREFIX,
		},
		nbr: {
			type: 'string',	
		},	
		type: {
			type: 'string',
			default: PARAMS.PHONE_DEFAULT_TYPE,
		}
	},
	behaviors: ['audit_trail'],	
	methods: {
		display: function() {
			return this.prefix+'-'+this.nbr;
		}
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5, 'At least 5 character!')
		],
		prefix: [
			Validators.string(),
			Validators.maxLength(5,'At most 5 characters!')
		],
		nbr: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5,'At least 5 characters!'),
			Validators.maxLength(20,'At most 20 characters!')
		],
		type: [
			Validators.required(),
			Validators.string(),
			Validators.choice(VALUES.PHONE_TYPE),
		]
	}
});

