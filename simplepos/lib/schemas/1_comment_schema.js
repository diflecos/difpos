Schemas.Comment = new SimpleSchema({
	comment: {
		type: String,
		max: 1000
	},  
	author: {
		type: String,
		max: 10
	},
	datetime: {
		type: Date
	}
});
