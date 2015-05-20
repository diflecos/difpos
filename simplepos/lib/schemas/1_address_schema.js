Schemas.Address = new SimpleSchema({
	name: {
		type: String,
		max: 100
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
		allowedValues: PARAMS.COUNTRY
	}
});
