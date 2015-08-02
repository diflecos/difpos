Meteor.methods({
	cashFlowAdd: function(cashflow) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		cashFlowId=CashFlows.insert({
			flow_type: cashflow.flow_type,
			amount: cashflow.amount,
			concept: cashflow.concept,
			comment: cashflow.comment,
			op_date: new Date(),
			createdAt: new Date(),
			udpatedAt: new Date(),
			createdBy: Meteor.userId(),
			updatedBy: Meteor.userId(),
		});
		
		return cashFlowId;
	},
	cashFlowCheck: function(cashFlowId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		return (CashFlows.findOne({_id: cashFlowId})!=undefined)?true:false;		
	},
	cashFlowView: function(cashFlowId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		return CashFlows.findOne({_id: cashFlowId});
	},
	cashFlowRemove: function(cashFlowId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		CashFlows.remove(cashFlowId);
	},
});
