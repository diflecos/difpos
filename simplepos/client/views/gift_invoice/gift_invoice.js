Template.gift_invoice.helpers({
	currency_symbol: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.currency.symbol;
	},
	order_items: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.order_items;
	},
	payment_trxs: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.payment_trxs;
	},
	isThereOrderItems: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.order_items.length>0;
	},
	isTherePayments: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.payment_trxs.length>0;
	},
	isOrderSettled: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.settled=="Yes";
	},
	isThereDiscount: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.discount!=undefined;	
	},
	discountName: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.discount.name;	
	},
	discount: function() {
		currentOrderInSession=Session.get("currentOrder");	
		if(currentOrderInSession.discount==undefined) 
			return "";
		
		if(currentOrderInSession.discount.type=="Percentage")
			return "-"+currentOrderInSession.discount.value+"%";
			
		if(currentOrderInSession.discount.type=="Amount") {
			return "-"+currentOrderInSession.discount.value+currentOrderInSession.currency.symbol;
		}	
	},
	UI_subtotal: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrder.currency.convertUI(currentOrderInSession.subtotal);
	},
	UI_discount: function() {
		return currentOrderInSession.discount.display;
	},
	UI_final_price: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrder.currency.convertUI(currentOrderInSession.final_price);
	},
	reductionTypes: function() {
		return OPTIONS.REDUCTION_TYPE;
	},
	isSettled: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.is_settled;
	},
	restToSettle: function() {
		currentOrderInSession=Session.get("currentOrder");
		return store.currency.convertUI(currentOrderInSession.final_price-currentOrderInSession.paid);
	}
});

Template.gift_invoice.events({
	"click #print": function(event) {
		event.preventDefault();
	}
});

