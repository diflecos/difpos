

Template.order.helpers({
	currency_symbol: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.currency.symbol;
	},
	order_items: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.order_items;
	},
	isThereOrderItems: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.order_items.length>0;
	},
	final_price: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.final_price;
	}
});

Template.order_item.helpers({
	currency_symbol: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.currency.symbol;
	},
	discount: function() {
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