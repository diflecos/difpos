Tax=Astro.Class({
	name: 'Tax',
	fields: {
		name: {
			type: 'string',
			default: '',		
		},
		percentage: {
			type: 'object',	
		},	
	},
	init: function (attrs) {  // Constructor
		this.set('name',attrs.name);
		this.set('percentage',attrs.percentage);		
	},	
	methods: {
		calc: function(amountDB) {
			return Math.round((this.percentage*amountDB)/100);
		}
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5, 'At least 5 character!')
		],
		percentage: [
			Validators.required(),
			Validators.number(),
			Validators.gt(0),
		],
	}
});



