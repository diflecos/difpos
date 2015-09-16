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
		payment_trxs: {
			type: 'array',
		},
		public_comment: {
			type: 'string',
			default: '',
		},
		private_comments: {
			type: 'array',
			default: '',
		},
		cancelled: {
			type: 'boolean',
			default: 'false',
		},		
	},
	behaviors: ['audit_trail'],
	methods: {
		addPublicComment: function(comment) {
			this.set('public_comment',comment);
		},
		addPrivateComment: function(comment) {
			this.private_comments.push(comment);
		},
		session: function() {
			return Sessions.findOne({'_id': this.sessionId});
		},
		currency: function() {
			return Currencies.findOne({'_id': this.currencyId});
		},
		isCancelled: function() {
			return this.cancelled;
		},
		amount_bt: function() {
			// encontrar todos los items que contiene la operación y ver cuanto suman --> mejor implementar en cada tipo de operación
		},
		amount_at: function() {
			// idem que el método anterior pero después de impuestos
		},
		isPaid: function() {
			var paid_amount=0;
			PaymentTrxs.find({'operationId': this._id}).forEach(function(payment_trxs) {
				paid_amount+=payment_trxs.amount;
			});
			return paid_amount>=this.amount();  // igual habría que detectar si se ha pagado de más y lanzar algún tipo de error...
		},
		addPaymentTrx: function(payment_trxs) {
			this.payment_trxs.push(payment_trxs);
		},
		delPaymentTrx: function(i) {
			if(i!=undefined) {
				this.payment_trxs.splice(i,1);
			}	
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
		payment_trxs: [
			Validators.array(),
		],
		public_comment: [
			Validators.string(),
			Validators.maxLength(1000,'At most 1000 characters!'),
		],
		private_comments: [
			Validators.array(),
		],
		cancelled: [
			Validators.required(),
			Validators.boolean(),
		],
	}
});
