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
		payment_trx: {
			type: 'array',
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
		amount_bt: function() {
			// encontrar todos los items que contiene la operación y ver cuanto suman --> mejor implementar en cada tipo de operación
		},
		amount_at: function() {
			// idem que el método anterior pero después de impuestos
		},
		isPaid: function() {
			var paid_amount=0;
			PaymentTrxs.find({'operationId': this._id}).forEach(function(payment_trx) {
				paid_amount+=payment_trx.amount;
			});
			return paid_amount>=this.amount();  // igual habría que detectar si se ha pagado de más y lanzar algún tipo de error...
		},
		addPaymentTrx: function(payment_trx) {
			this.payment_trxs.push(payment_trx);
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
		payment_trx: [
			Validators.array(),
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
