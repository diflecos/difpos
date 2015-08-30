Brand=Astro.Class({
	name: 'Brand',
	collection: Brands,
	fields: {
		name: {
			type: 'string',
			default: '',		
		},
		logo: {
			type: 'string',	
		},
		url: {
			type: 'string',	
		},
		customerCarePhoneId: {
			type: 'string',	
			default: ''
		},
		customerCareEmailId: {
			type: 'string',	
		},
		socialIds: {
			type: 'array',
		},	
	},
	relations: {
		customerCarePhone: {
			type: 'one',
			class: 'Phone',
			local: 'customerCarePhoneId',
			foreign: '_id'
		},
		customerCareEmail: {
			type: 'one',
			class: 'Email',
			local: 'customerCareEmailId',
			foreign: '_id'			
		},
	},		
	behaviors: ['audit_trail'],	
	methods: {
		
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3, 'At least 3 character!'),
			Validators.maxLength(20, 'At most 20 character!'),
		],
		logo: [
			Validators.maxLength(20, 'At most 200 character!'),
		],
		url: [
			Validators.required(),
			Validators.maxLength(200, 'At most 200 character!'),
		],
		customerCarePhoneId: [
			Validators.string(), 
			Validators.maxLength(20, 'At most 20 character!'),			
		],
		customerCareEmailId: [
			Validators.string(),
		]
		//socialIds: Validators.array(),
	}
});



