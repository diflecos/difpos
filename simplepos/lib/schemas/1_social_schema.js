Schemas.Social = new SimpleSchema({
	name: {
		type: String,
		allowedValues: PARAMS.SOCIAL
	},  
	value: {
		type: String,
		max: 100
	}
});
