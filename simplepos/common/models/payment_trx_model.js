PaymentTrx=function PaymentTrx(payment_trx) {   // payment_trx debe tener los siguientes campos: type,paid,details
	this.paymentTrxId;
	this.type=payment_trx.type;
	this.paid=parseInt(payment_trx.paid);
	this.details=payment_trx.details;
}

PaymentTrx=Astro.Class({
	name: 'PaymentTrx',
	collection: PaymentTrxs,
	fields: {
		type: {
			type: 'string',
		},
		paid: {
			type: 'number',
		},
		details: {
			type: 'object',	
		},	
	},
	behaviors: ['audit_trail'],	
	validators: {
		// FALTA

	}
});

