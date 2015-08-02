Meteor.methods({
	cashCheckAdd: function(cashcheck) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
		
		cashCheckId=CashChecks.insert({
			type: cashcheck.flow_type,
			billcoin_count: cashcheck.billcoin_count,
			comment: cashcheck.comment,
			op_date: new Date(),
			createdAt: new Date(),
			udpatedAt: new Date(),
			createdBy: Meteor.userId(),
			updatedBy: Meteor.userId(),
		});
		
		return cashCheckId;
	},
	cashCheckCheck: function(cashCheckId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		return (CashChecks.findOne({_id: cashCheckId})!=undefined)?true:false;		
	},
	cashCheckView: function(cashCheckId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		return CashChecks.findOne({_id: cashCheckId});
	},
	cashCheckRemove: function(cashCheckId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		CashChecks.remove(cashCheckId);
	},
});
