Template.order.helpers({
	currency_symbol: function() {
		currentOrder=Session.get("currentOrder");
		return currentOrder.currency.symbol;
	},
	order_items: function() {
		currentOrder=Session.get("currentOrder");
		return currentOrder.order_items;
	},
	isThereOrderItems: function() {
		currentOrder=Session.get("currentOrder");
		return currentOrder.order_items.length>0;
	},
	final_price: function() {
		currentOrder=Session.get("currentOrder");
		return currentOrder.final_price;
	}
});

Template.order_item.helpers({
	currency_symbol: function() {
		currentOrder=Session.get("currentOrder");
		return currentOrder.currency.symbol;
	},
	discount: function() {
		if(this.discount==undefined) 
			return "";
		
		if(this.discount.type=="percentage")
			return "-"+this.discount.value+"%";
			
		if(this.discount.type=="amount") {
			currentOrder=Session.get("currentOrder");
			return "-"+this.discount.value+currentOrder.currency.symbol;
		}	
	}
});
