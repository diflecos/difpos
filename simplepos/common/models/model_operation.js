/* Parent class for CashFlows, Orders, Reservations, etc */
Operation=Astro.Class({
	name: 'Operation',
	collection: Operations,
	fields: {
		sessionId: {
			type: 'string',
			default: '',		
		},
		currencyId: {
			type: 'string',
			default: '',
		},
		date: {
			type: 'string',	
			default: '',
		},
		amount: {
			type: 'number',
			default: 0.0,
		},
		payment_trx: {
			type: 'array',
		},
		paid: {
			type: 'boolean',
			default: 'false',
		},
		public_comment: {
			type: 'string',
			default: '',
		},
		private_comment: {
			type: 'string',
			default: '',
		},
		cancelled: {
			type: 'boolean',
			default: 'false',
		},		
	},
	behaviors: ['audit_trail'],
	methods: {
		session: function() {
			return Sessions.findOne({'_id': this.sessionId});
		},
		currency: function() {
			return Currencies.findOne({'_id': this.currencyId});
		},
		isCancelled: function() {
			return this.cancelled;
		},
		isPaid: function() {
			return this.paid;
		}
	},
	validators: {
		sessionId: [
			Validators.required(),
			Validators.string(),
		],
		currencyId: [
			Validators.required(),
			Validators.string(),
		],
		date: [
			Validators.required(),
			Validators.date(),
		],
		amount: [
			Validators.required(),
			Validators.number(),
		],
		payment_trx: [
			Validators.array(),
		],
		paid: [
			Validators.required(),
			Validators.boolean(),
		],
		public_comment: [
			Validators.string(),
			Validators.maxLength(1000,'At most 1000 characters!'),
		],
		private_comment: [
			Validators.string(),
			Validators.maxLength(1000,'At most 1000 characters!'),
		],
		cancelled: [
			Validators.required(),
			Validators.boolean(),
		],
	}
});
