Schemas.Discount = new SimpleSchema({
	name: {
		type: String,
		max: 10
	},	
	description: {
		type: String,
		max: 1000
	},  
	reduction_type: {
		type: String,
		allowedValues: VALUES.SPECIAL_OFFER_TYPE,	
	},
	price_impact: {
		type: Number
	},
	impact_before_tax: {
		type: Boolean
	},
	active: {
		type: Boolean
	},
	valid_from: {
		type: Date
	},
	valid_to: {
		type: Date
	}
});
