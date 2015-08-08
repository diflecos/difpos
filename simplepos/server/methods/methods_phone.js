Meteor.methods({
	phoneSave: function(phone) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(phone.validateAll())	{
			phone.save();
		} else {  
			throw new Meteor.Error("phone-validation-error","Falló la validación del tfno "+phone,phone.getValidationErrors());
		}
		
		return phone;
	},
	phoneRemove: function(phoneId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		phones.remove(phoneId);
	},
});
