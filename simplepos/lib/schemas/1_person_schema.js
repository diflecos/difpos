Schemas.Person = new SimpleSchema({
	name: {
		type: String,
		max: 100
	},  
	family_name: {
		type: String,
		max: 100
	},
	nick: {
		type: String,
		max: 50,
		optional: true
	},
	id_nbr: {
		type: String,
		max: 50,
		optional: true
	},
	birthdate: {
		type: Date,
		//min: "1900-01-01T00:00:00.000Z",
		optional: true
	},
	gender: {
		type: String,
		allowedValues: PARAMS.GENDER,
		optional: true
	},
	civil_status: {
		type: String,
		allowedValues: PARAMS.CIVIL_STATUS,
		optional: true
	}
});

