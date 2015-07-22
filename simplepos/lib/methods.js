Meteor.methods({
	/******************************** ORDER *****************************************/
	addOrder: function (order) {
	// Make sure the user is logged in before inserting a task
		if (! Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}

		orderId=Orders.insert({
			currency: order.currency,
			order_items: order.order_items,
			subtotal: order.subtotal,
			final_price: order.final_price,
			next_index: order.next_index,
			payment_trxs: order.payment_trxs,
			paid: order.paid,
			is_settled: order.is_settled,
			public_comment: order.public_comment,
			private_comment: order.private_comment,
			purchase_date: new Date(),
			employee: Meteor.userId(),
			createdAt: new Date(),
			udpatedAt: new Date(),
			createdBy: Meteor.userId(),
			updatedBy: Meteor.userId(),
		});
		
		return orderId;
	},
	checkOrderId: function(orderId) {
		return (Orders.findOne({_id: orderId})!=undefined)?true:false;
	},
	viewOrder: function(orderId) {
		return Orders.findOne({_id: orderId});
	},
	deleteOrder: function (orderId) {
		Orders.remove(orderId);
	},
	
	/******************************** CASH FLOW *****************************************/
	cashFlowAdd: function(cashflow) {
		if (!Meteor.userId()) {
			throw new Meteor.Error("not-authorized");
		}	
		
		cashFlowId=CashFlows.insert({
			flow_type: cashflow.flow_type,
			amount: cashflow.amount,
			concept: cashflow.concept,
			comment: cashflow.comment,
			createdAt: new Date(),
			udpatedAt: new Date(),
			createdBy: Meteor.userId(),
			updatedBy: Meteor.userId(),
		});
		
		return cashFlowId;
	},
	cashFlowCheck: function(cashFlowId) {
		return (CashFlows.findOne({_id: cashFlowId})!=undefined)?true:false;		
	},
	cashFlowView: function(cashFlowId) {
		return CashFlows.findOne({_id: cashFlowId});
	},
	cashFlowRemove: function(cashFlowId) {
		CashFlows.remove(cashFlowId);
	}
});