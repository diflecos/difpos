Schemas.Social = new SimpleSchema({
	name: {
		type: String,
		allowedValues: VALUES.SOCIAL
	},  
	value: {
		type: String,
		max: 100
	}
});
