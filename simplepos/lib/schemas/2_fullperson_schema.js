Schemas.FullPerson = new SimpleSchema({
	person: {
		type: Schemas.Person
	},
	emails: {
		type: [Schemas.Email],
		maxCount: 5,
		optional: true
	},
	phones: {
		type: [Schemas.Phone],
		maxCount: 5,
		optional: true
	},
	addresses: {
		type: [Schemas.Address],
		maxCount: 5,
		optional: true
	},
	social: {
		type: [Schemas.Social],
		maxCount: 10,
		optional: true
	},
	createdAt: {
		type: Date,
		autoValue: function() {
			if (this.isInsert) {
				return new Date;
			} 
		}
	},
	updatedAt: {
		type: Date,
		autoValue: function() {
			return new Date();
		}
	},
	createdBy: {
		type: String,
		autoValue: function() {
			if (this.isInsert) {
				return Meteor.user()?Meteor.user().username:"unknown";
			} 
		}
	},
	updatedBy: {
		type: String,
		autoValue: function() {
				return Meteor.user()?Meteor.user().username:"unknown";
		}
	}
});



/*
console.log("validando: ");
obj={
  "person": {
    "name": "Jara",
    "family_name": "García Roqué",
    "nick": "jara",
    "id_nbr": "44433119V",
    "birthdate": "13/09/1977",
    "gender": "Female",
    "civil_status": "Married"
  },
  "emails": [
    {
      "name": "trabajo",
      "address": "jara.garcia@diflecos.com"
    },
    {
      "name": "personal",
      "address": "jaramelo69@hotmail.com"
    },
    {
      "name": "otro",
      "address": "jara_gr@hotmail.com"
    }
  ],
  "phones": [
    {
      "name": "mobile",
      "nbr": "680879884"
    },
    {
      "name": "casa",
      "nbr": "913675675"
    }
  ],
  "addresses": [
    {
	  "name": "Domicilio Madrid",
      "street": "C/Francisco Madariaga, 2 - 2ºC",
      "town": "Madrid",
      "zipcode": "28017",
      "country": "Spain"
    },
    {
	  "name": "Domicilio León",
      "street": "Avda Gran Via de San Marcos, 21 - 10F",
      "town": "León",
      "zipcode": "24001",
      "country": "Spain"
    }
  ],
  "social": [
    {
      "name": "Facebook",
      "value": "jara"
    },
    {
      "name": "Twitter",
      "value": "jaramelo_twitter"
    }
  ],
  "createdAt": "2015-04-24T13:02:39.816Z",
  "updatedAt": "2015-04-24T13:02:39.816Z",
  "createdBy": "antuan",
  "updatedBy": "admin"
};

console.log(FullPersonSchema.namedContext("myContext").validate(obj));
*/