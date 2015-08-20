CashCheck=Astro.Class({
	name: 'CashCheck',
	fields: {
		sessionId: {
			type: 'string',		
		},
		billcoin_count: {  // billcoin_count es un array de la forma: [	{billcoin_value: XXX, quantity: Y},{billcoin_value: XXX, quantity: Y}   ]
			type: 'array',	
		},
		type: {
			type: 'string',	
		},
		comment: {
			type: 'string',	
		},
	},
	relations: {
		session: {
			type: 'one',
			class: 'SessionPOS',
			local: 'sessionId',
			foreign: '_id'			
		},
	},		
	methods: {
		count: function() {
			var total=0;
			$.each(this.billcoin_count,function(i,record) {
				total+=parseInt(record.billcoin_value)*parseInt(record.quantity);
			});
			return total;
		}
	},
	validators: {
		sessionId: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5, 'At least 5 character!')
		],
		billcoin_count: [
			Validators.required(),
			Validators.array(),
		],
		type: [
			Validators.required(),
			Validators.string(),
		],
		comment: [
			Validators.string(), 
			Validators.minLength(3,'At least 3 characters'), 
			Validators.maxLength(1000,'At most 1000 characters'), 
		],
	}
});


