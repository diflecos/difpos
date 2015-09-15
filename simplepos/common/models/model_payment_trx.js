PaymentTrx=function PaymentTrx(payment_trx) {   // payment_trx debe tener los siguientes campos: type,paid,details
	this.paymentTrxId;
	this.type=payment_trx.type;
	this.amount=parseInt(payment_trx.amount);
	this.details=payment_trx.details;
}

PaymentTrx=Astro.Class({
	name: 'PaymentTrx',
	collection: PaymentTrxs,
	fields: {
		type: {
			type: 'string',
		},
		amount: {
			type: 'number',
		},
		details: {
			type: 'object',	
		},	
		operationId: {
			type: 'string',
		}
	},
	behaviors: ['audit_trail'],	
	validators: {
		// FALTA

	}
});

