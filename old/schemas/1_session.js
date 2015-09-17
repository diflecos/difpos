Schemas.Session = new SimpleSchema({
	store: {
		type: String
	},
	user: {
		type: String
	},
	init: {
		type: Date
	},
	end: {
		type: Date
	},
	ip: {
		type: String,
		max: 100
	},
	agent: {
		type: String,
		max: 1000
	},
	verification_ok: {
		type: Boolean
	},

});
