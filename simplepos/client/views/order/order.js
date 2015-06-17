Template.order.helpers({
	currency_symbol: function() {
		currentOrder=Session.get("currentOrder");
		return currentOrder.currency.symbol;
	},
	order_items: function() {
		currentOrder=Session.get("currentOrder");
		return currentOrder.order_items;
	}
});

Template.order_item.helpers({
	currency_symbol: function() {
		currentOrder=Session.get("currentOrder");
		return currentOrder.currency.symbol;
	}
});
