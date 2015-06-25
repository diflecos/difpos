

Template.order.helpers({
	currency_symbol: function() {
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
	},
	position: function() {
		return ;
	}
});

Template.order_item.events({
	"click a.add1": function(event) {
		var index=event.currentTarget.dataset.index;	
		currentOrder=Session.get("currentOrder");

	},
	"click a.del1": function(event) {
		var index=event.currentTarget.dataset.index;	
		currentOrder=Session.get("currentOrder");	
		order_item=currentOrder.order_items[index];		
		if(order_item.quantity>1) {
			order_item.quantity++;
			order_item.price=order_item.final_unit_price*order_item.quantity;
			
		}
		Session.set("currentOrder",currentOrder);
	},
	"click a.del": function(event) {
		var index=event.currentTarget.dataset.index;    
		currentOrder=Session.get("currentOrder");
		for(var i=0;i<currentOrder.order_items.length;i++) {
			if(currentOrder.order_items[i].index==index)
				currentOrder.order_items.splice(i,1);
		}
		Session.set("currentOrder",currentOrder);
	},
	"click a.edit": function(event) {
		var index=event.currentTarget.dataset.index;	
	
	}
});