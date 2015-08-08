Meteor.methods({
	addressSave: function(address) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(address.validateAll())	{
			address.save();
		}
		
		return address;
	},
	addressRemove: function(addressId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		Addresses.remove(addressId);
	},
});
