Schemas.Email = new SimpleSchema({
	name: {
		type: String,
		allowedValues: VALUES.EMAIL_TYPE,
	},  
	address: {
		type: String,
		max: 100,
		regEx: SimpleSchema.RegEx.Email
	}
});
