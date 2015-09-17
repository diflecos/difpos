Schemas.Phone = new SimpleSchema({
	name: {
		type: String,
		allowedValues: VALUES.PHONE_TYPE
	},  
	prefix: {
		type: String,
		max: 10, 
		optional: true
	},
	nbr: {
		type: String,
		max: 12
	}
});
