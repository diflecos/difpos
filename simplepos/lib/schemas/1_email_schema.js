Schemas.Email = new SimpleSchema({
	name: {
		type: String,
		max: 100
	},  
	address: {
		type: String,
		max: 100,
		regEx: SimpleSchema.RegEx.Email
	}
});
