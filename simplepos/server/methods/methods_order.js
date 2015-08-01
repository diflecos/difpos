Meteor.methods({
	orderSave: function (order) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		result=Orders.upsert(order.id,{
			$set: {
				order_items: order.order_items,
				subtotal: order.subtotal,
				final_price: order.final_price,
				next_index: order.next_index,
				payment_trxs: order.payment_trxs,
				paid: order.paid,
				is_settled: order.is_settled,
				public_comment: order.public_comment,
				private_comment: order.private_comment,
				udpatedAt: new Date(),
				updatedBy: Meteor.userId(),
			},
			$setOnInsert: {
				session: order.session,
				currency: order.currency,
				purchase_date: new Date(),
				employee: Meteor.userId(),
				createdAt: new Date(),
				createdBy: Meteor.userId(),			
			}
		});

		return result;
	},
	checkOrderId: function(orderId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		return (Orders.findOne({_id: orderId})!=undefined)?true:false;
	},
	viewOrder: function(orderId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		return Orders.findOne({_id: orderId});
	},
	orderRemove: function (orderId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		Orders.remove(orderId);
	},
});
