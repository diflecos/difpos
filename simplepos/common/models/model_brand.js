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
		socials: {
			type: 'many',
			class: 'Social',
			local: 'socialIds',
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
			Validators.minLength(3, 'At least 3 character!')
		],
		logo: Validators.required(),
		url: Validators.required(),
		customerCarePhoneId: Validators.string(), 
		customerCareEmailId: Validators.string(),
		//socialIds: Validators.array(),
	}
});



