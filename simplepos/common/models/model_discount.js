Discount=Astro.Class({
	name: 'Discount',
	fields: {
		name: {
			type: 'string',	
		},
		type: {    //   'Amount' o 'Percentage'
			type: 'string',	
		},
		amount: {
			type: 'number',	
		},
		percentage: {   
			type: 'number',	
		},
		apply: {  // 'BeforeTax'  o 'AfterTax'
			type: 'string',
		}
	},
	init: function (attrs) {  // Constructor
		this.set('name',attrs.name);
		this.set('type',attrs.type);
		this.set('amount',attrs.amount);
		this.set('percentage',attrs.percentage);		
		this.set('apply',attrs.apply);
	},		
	relations: {

	},		
	methods: {
		display: function() {
			if(this.type=='Amount')
				return '-'+store.currency.convertUI(this.amount);
			if(this.type=='Percentage')
				return '-'+this.percentage+'%';
		},
		discountedPrice: function(priceDB) {
			if(this.type=='Amount')
				return priceDB-this.amount;
			if(this.type=='Percentage')
				return Math.round(priceDB*(1-this.percentage/100));
		}		
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3, 'At least 3 character!'),
			Validators.maxLength(20, 'At most 20 character!'),
		],
		type: [
			Validators.required(),
			Validators.string(),
			Validators.choice(VALUES.REDUCTION_TYPE),
		], 
		amount: [
			Validators.required(),
			Validators.number(),		
			Validators.gte(0),
		],
		percentage: [
			Validators.required(),
			Validators.number(),		
			Validators.gte(0),		
		],
		apply: [
			Validators.required(),
			Validators.string(),
			Validators.choice(VALUES.DISCOUNT_APPLY)
		]
	}
});
