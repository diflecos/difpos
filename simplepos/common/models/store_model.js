Store=Astro.Class({
	name: 'Store',
	collection: Stores,
	fields: {
		name: {
			type: 'string',
			default: '',
			validators: [
				Validators.required(),
				Validators.string(),
				Validators.minLength(3)
			]			
		},
		currency: {
			type: 'object',
			validators: [
				Validators.required(),
			]		
		},
		address: {
			type: 'object',
			validators: [
				Validators.required(),
			]		
		},
		phone: {
			type: 'object',
			validators: [
				Validators.required(),
			]		
		},
		createdAt: {
			type: 'date',
			validators: [
				Validators.required(),
			]		
		},
		udpatedAt: {
			type: 'date',
			validators: [
				Validators.required(),
			]		
		},
		createdBy: {
			type: 'string',
			validators: [
				Validators.required(),
			]		
		},
		updatedBy: {
			type: 'string',
			validators: [
				Validators.required(),
			]		
		},		
	},
	methods: {
		lastSession: function() {                     // esto igual se puede implementar como una relación!
			return SessionPOS.last(this._id);
		}
	}
});

