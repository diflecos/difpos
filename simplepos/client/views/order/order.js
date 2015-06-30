

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
	subtotal: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.subtotal;
	},
	final_price: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.final_price;
	},
	reductionTypes: function() {
		return OPTIONS.REDUCTION_TYPE;
	}
});

Template.order.events({
	"click #add_discount": function(event) {
		event.preventDefault();
	
		var discount_name=$("#discount_name").val();
		var discount_value=$("#discount_value").val();
		var discount_reduction_type=$("#discount_reduction_type").val();		

		if(discount_value>0 && discount_reduction_type!="") {
			discount=new Discount(discount_name,discount_reduction_type,discount_value);
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
	}
});

Template.order_item.helpers({
	currency_symbol: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.currency.symbol;
	},
	order_item_discount: function() {  // --> REVISAR: deberíamos referenciar a los datos en el currentOrderInSession, no?
		currentOrderInSession=Session.get("currentOrder");	
		if(this.discount==undefined) 
			return "";
		
		if(this.discount.type=="Percentage")
			return "-"+this.discount.value+"%";
			
		if(this.discount.type=="Amount") {
			return "-"+this.discount.value+currentOrderInSession.currency.symbol;
		}	
	},
	position: function() {
		return ;
	}
});

Template.order_item.events({
	"click a.add1": function(event) {
		var index=event.currentTarget.dataset.index;	
		currentOrder.add1(index);
		Session.set("currentOrder",currentOrder);
		$("#beep")[0].play();
	},
	"click a.del1": function(event) {
		var index=event.currentTarget.dataset.index;	
		currentOrder.del1(index);
		Session.set("currentOrder",currentOrder);	
		$("#remove")[0].play();		
	},
	"click a.del": function(event) {
		var index=event.currentTarget.dataset.index;    
		currentOrder.delOrderItem(index);
		Session.set("currentOrder",currentOrder);
		$("#remove")[0].play();		
	}
});