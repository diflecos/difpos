Meteor.methods({
	emailSave: function(email) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(email.validate())	{
			email.save();
		}
		
		return email;
	},
	emailRemove: function(emailId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		emails.remove(emailId);
	},
});
