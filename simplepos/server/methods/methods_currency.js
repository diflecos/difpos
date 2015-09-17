Meteor.methods({
	currencySave: function(currency) {   console.log(currency)
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		if(currency.validateAll())	{
			currency.save();
		}
		
		return currency;
	},
	currencyRemove: function(currencyId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		currencies.remove(currencyId);
	},
});
