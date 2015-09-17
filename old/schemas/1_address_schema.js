Schemas.Address = new SimpleSchema({
	name: {
		type: String,
		allowedValues: VALUES.ADDRESS_TYPE
	},  
	street: {
		type: String,
		max: 100
	},
	town: {
		type: String,
		max: 50
	},
	zipcode: {
		type: String
	},
	country: {
		type: String,
		allowedValues: VALUES.COUNTRY
	}
});
