Store=Astro.Class({
	name: 'Store',
	collection: Stores,
	fields: {
		name: {
			type: 'string',
			default: '',		
		},
		currencyId: {
			type: 'string',	
		},
		addressId: {
			type: 'string',	
		},
		phoneId: {
			type: 'string',	
		},
		emailId: {
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
	relations: {
		currency: {
			type: 'one',
			class: 'Currency',
			local: 'currencyId',
			foreign: '_id'			
		},
		address: {
			type: 'one',
			class: 'Address',
			local: 'addressId',
			foreign: '_id'			
		},
		phone: {
			type: 'one',
			class: 'Phone',
			local: 'phoneId',
			foreign: '_id'
		},
		email: {
			type: 'one',
			class: 'Email',
			local: 'emailId',
			foreign: '_id'			
		}		
	},		
	methods: {
		lastSession: function() {                     // esto igual se puede implementar como una relación!
			return SessionPOS.last(this._id);
		}
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5, 'At least 5 character!')
		],
		currencyId: Validators.required(),
		addressId: Validators.required(),
		phoneId: Validators.string(), 
		emailId: Validators.string(),
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

