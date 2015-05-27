Schemas.OrderItem = new SimpleSchema({
	name: {
		type: String,
		max: 1000
	},  
	short_description: {
		type: String,
		max: 10
	},
	price: {
		type: Number
	},
	currency: {
		type: String
	},
	tax_percentage: {
		type: Number
	}
});
