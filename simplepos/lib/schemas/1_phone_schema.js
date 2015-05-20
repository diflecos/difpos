Schemas.Phone = new SimpleSchema({
	name: {
		type: String,
		max: 100
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
