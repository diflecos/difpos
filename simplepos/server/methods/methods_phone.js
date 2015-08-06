Meteor.methods({
	phoneSave: function(phone) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(phone.validate())	{
			phone.save();
		}
		
		return phone;
	},
	phoneRemove: function(phoneId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		phones.remove(phoneId);
	},
});
