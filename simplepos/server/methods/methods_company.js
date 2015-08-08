Meteor.methods({
	companySave: function(company) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(company.validateAll())	{
			company.save();
		}
		
		return company;
	},
	companyRemove: function(companyId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		currencies.remove(companyId);
	},
});
