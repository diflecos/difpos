Meteor.methods({
	storeAdd: function(store) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
		
		check(store, {
			name: String,
			currency: Object,
			address: Object,
			phone: String,
		});
		
		storeId=Stores.insert({
			name     : store.name,
			currency : store.currency,
			address  : store.address,
			phone    : store.phone,
			createdAt: new Date(),
			udpatedAt: new Date(),
			createdBy: Meteor.userId(),
			updatedBy: Meteor.userId(),
		});
		
		return storeId;
	},
	storeCheck: function(storeId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		check(storeId, String);

		return (Stores.findOne({_id: storeId})!=undefined)?true:false;		
	},
	storeView: function(storeId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		return Stores.findOne({_id: storeId});
	},
	storeRemove: function(storeId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		Stores.remove(storeId);
	},
});
