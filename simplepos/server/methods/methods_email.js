Meteor.methods({
	emailSave: function(email) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(email.validateAll())	{
			email.save();
		} else {  
			throw new Meteor.Error("email-validation-error","Falló la validación del email "+email,email.getValidationErrors());
		}
		
		return email;
	},
	emailRemove: function(emailId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		emails.remove(emailId);
	},
});
