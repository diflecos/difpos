Meteor.methods({
	storeSave: function(store) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
		
/* 		check(store, {    // No podemos usar esto porque este método se espera un plain object, no un modelo con comportamiento
			name: String,
			currency: Object,
			regional_store_network: Object,
			address: Object,
			phone: String,
		}); */
		
		store.set("createdAt", new Date());  // ver como implementamos esto con behaviours o al menos que se distinga si es el caso de un insert o un update
		store.set("udpatedAt", new Date());
		store.set("createdBy", Meteor.userId());
		store.set("updatedBy", Meteor.userId());

		if(store.validateAll())	{
			store.save();
		}
		
		return store;
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
