Meteor.methods({
	currencySave: function(currency) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(currency.validate())	{
			currency.save();
		}
		
		return currency;
	},
	currencyRemove: function(currencyId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		currencies.remove(currencyId);
	},
});
