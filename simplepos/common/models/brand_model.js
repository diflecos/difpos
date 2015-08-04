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
	relations: {
		customerCarePhone: {
			type: 'one',
			class: 'Phone',
			local: 'phoneId',
			foreign: '_id'
		},
		customerCareEmail: {
			type: 'one',
			class: 'Email',
			local: 'emailId',
			foreign: '_id'			
		},
		socials: {
			type: 'many',
			class: 'Social',
			local: 'socialIds',
			foreign: '_id'			
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
		logo: Validators.required(),
		url: Validators.required(),
		customerCarePhoneId: Validators.string(), 
		customerCareEmailId: Validators.string(),
		socialIds: Validators.array(),
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



