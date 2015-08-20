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
		getDiscountedPrice: function(priceDB) {
			if(this.type=='Amount')
				return priceDB-this.amount;
			if(this.type=='Percentage')
				return Math.round(priceDB*(1-this.percentage/100));
		}		
	},
	validators: {
	}
});
