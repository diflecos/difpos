Template.order.helpers({
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

Template.order.events({
	"click #add_discount": function(event) {
		event.preventDefault();
	
		var discount_name=$("#discount_name").val();
		var discount_value=$("#discount_value").val();
		var discount_reduction_type=$("#discount_reduction_type").val();		
		
		if(discount_value>0) {
			switch(discount_reduction_type) {
				case "Amount":
					discount=new AmountDiscount(discount_name,currentOrder.currency.convertDB(discount_value));				
					break;
				case "Percentage":
					discount=new PercentageDiscount(discount_name,discount_value);				
					break;
				default:
					discount=undefined;				
					break;
			}
		} else {
			discount=undefined;
		}
		
		currentOrder.addDiscount(discount);
		Session.set("currentOrder",currentOrder);
	},
	"click #del_discount": function(event) {  
		event.preventDefault();
		currentOrder.removeDiscount();
		Session.set("currentOrder",currentOrder);
		$("#remove")[0].play();	
	},
	"click #add_product": function(event) {
		event.preventDefault();
		
	}
});

Template.order_item.helpers({
	UI_unit_price: function() {
		return currentOrder.currency.convertUI(this.unit_price);
	},
	UI_unit_discount: function() {
		return (this.unit_discount!=undefined)?this.unit_discount.display:"";
	},
	UI_final_unit_price: function() {
		return currentOrder.currency.convertUI(this.final_unit_price);
	},
	UI_price: function() {
		return currentOrder.currency.convertUI(this.price);
	},
	UI_order_item_discount: function() {
		return (this.discount!=undefined)?this.discount.display:"";
	},
	UI_final_price: function() {
		return currentOrder.currency.convertUI(this.final_price);
	}
});

Template.order_item.events({
	"click a.add1": function(event) {
		event.preventDefault();
		
		var index=event.currentTarget.dataset.index;	
		currentOrder.add1(index);
		Session.set("currentOrder",currentOrder);
		$("#beep")[0].play();
	},
	"click a.del1": function(event) {
		event.preventDefault();

		var index=event.currentTarget.dataset.index;	
		currentOrder.del1(index);
		Session.set("currentOrder",currentOrder);	
		$("#remove")[0].play();		
	},
	"click a.del": function(event) {
		event.preventDefault();

		var index=event.currentTarget.dataset.index;    
		currentOrder.delOrderItem(index);
		Session.set("currentOrder",currentOrder);
		$("#remove")[0].play();		
	}
});

Template.payment_trx.helpers({
	UI_paid: function() {
		return currentOrder.currency.convertUI(this.paid);
	},
	index: function() {
		return 0; // REVISAR --> bien añadimos un payment_trx_index al Order o bien cuando meteor soporte {{@index}} en los templates lo ponemos
	}
});

Template.payment_trx.events({
	"click #del_payment_trx": function(event) {
		event.preventDefault();
		
		var index=event.currentTarget.dataset.index;	
		currentOrder.delPaymentTrx(index);
		Session.set("currentOrder",currentOrder);
		$("#remove")[0].play();			
	}
});
