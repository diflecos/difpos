Meteor.methods({
	socialSave: function(social) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(social.validateAll())	{
			social.save();
		} else {  
			throw new Meteor.Error("social-validation-error","Falló la validación del social "+social,social.getValidationErrors());
		}
		
		return social;
	},
	socialRemove: function(socialId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		socials.remove(socialId);
	},
});
