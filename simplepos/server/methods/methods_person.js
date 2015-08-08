Meteor.methods({
	personSave: function(person) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(person.validateAll())	{
			person.save();
		}
		
		return person;
	},
	personRemove: function(personId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		persons.remove(personId);
	},
});
