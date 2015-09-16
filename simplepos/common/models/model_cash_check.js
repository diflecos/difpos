CashCheck=Astro.Class({
	name: 'CashCheck',
	fields: {
		date: {
			type: 'date',		
		},
		billcoin_count: {  // billcoin_count es un array de la forma: [	{billcoin_value: XXX, quantity: Y},{billcoin_value: XXX, quantity: Y}   ]
			type: 'array',	
		},
		type: {
			type: 'string',	
		},
		comments: {
			type: 'array',	
		},
	},
	init: function (attrs) {  // Constructor
		this.set('date',attrs.date);
		this.set('billcoin_count',attrs.billcoin_count);
		this.set('type',attrs.type);
		this.set('comments',attrs.comments);		
	},		
	relations: {

	},		
	methods: {
		addComment: function(comment) {
			this.comments.push(comment);
		},
		count: function() {
			var total=0;
			$.each(this.billcoin_count,function(i,record) {
				total+=parseInt(record.billcoin_value)*parseInt(record.quantity);
			});
			return total;
		}
	},
	validators: {
		date: [
			Validators.required(),
			Validators.date(),
		],
		billcoin_count: [
			Validators.required(),
			Validators.array(),
		],
		type: [
			Validators.required(),
			Validators.string(),
		],
		comments: [
			Validators.array(), 
		],
	}
});


