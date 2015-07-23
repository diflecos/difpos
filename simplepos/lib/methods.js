Meteor.methods({
	/******************************** STORE *****************************************/
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
	
	/******************************** ORDER *****************************************/
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
	
	/******************************** CASH FLOW *****************************************/
	cashFlowAdd: function(cashflow) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

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

		/******************************** CASH CHECK *****************************************/
	cashCheckAdd: function(cashcheck) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
		
		cashCheckId=CashChecks.insert({
			type: cashcheck.flow_type,
			billcoin_count: cashcheck.billcoin_count,
			comment: cashcheck.comment,
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
	
	/******************************** SESSION *****************************************/
	sessionInit: function(storeId,type) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		sessionId=Sessions.insert({
			storeId: storeId,
			userId: Meteor.userId(),
			type: type,  // ENUM('admin','audit','ecommerce','pos')
			status: "Open", //  ENUM('open','closed','zombie')
			init: new Date(),
			end: undefined,
			initial_cashcheck: undefined,
			final_cashcheck: undefined,
			verification: undefined,
			ip: this.connection.clientAddress,
			comment: "",
			createdAt: new Date(),
			udpatedAt: new Date(),
			createdBy: Meteor.userId(),
			updatedBy: Meteor.userId(),
		});	
		
		return sessionId;
	}, 
	sessionInitialCashCheck: function(sessionId,initial_cashcheck) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
		
		Sessions.update(sessionId,{  
			$set: {
				initial_cashcheck: initial_cashcheck,
			}
		});				
	}, 
	sessionFinalCashCheck: function(sessionId,final_cashcheck) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
		
		Sessions.update(sessionId,{  
			$set: {
				final_cashcheck: final_cashcheck,
			}
		});				
	}, 
	sessionVerify: function(sessionId) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		var session=Sessions.findOne(sessionId);
			
		// verificar session.verification en funcion de las operaciones y los inputs y outputs de dinero
		var verification="OK";
		
		// actualizamos en la BBDD el nuevo valor y salimos devolviendo el resultado
		Sessions.update(sessionId,{  
			$set: {
				verification: verification,
			}
		});			
		return verification;
	}, 
	sessionEnd: function(sessionId,final_cashcheck,comment) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		Sessions.update(sessionId,{  
			$set: {
				status: "Closed",
				end: new Date(),
				final_cashcheck: final_cashcheck,
				comment: comment,
			}
		});		
	},
	sessionViewOperations: function() {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

	
	},
	
	/******************************** USERS *****************************************/	
	userAdd: function(username,password) {  console.log(username+","+password+"<-------------")
		userId=Accounts.createUser({
			"username": username,
			"password": password,
		});		
		console.log(userId);
		return userId;
	},
	userName: function(userId) {
	
	},
	userRemove: function(userId) {
	
	}
});