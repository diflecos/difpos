currentCashCheck=undefined;

function countTotal() {
	var bill_coin_count=$.map($(".billcoin-quantity"),function(input,i) { 
		var quantity=$(input).val();
		var billcoin_value=$(input).attr("data-billcoin-value"); 
		var aux={"billcoin_value": billcoin_value,"quantity": quantity};
		return aux;
	});
	
	var type="" // $("#");
	var comment=$("#comment").val();
	currentCashCheck=new CashCheck(bill_coin_count,type,comment);	
	$("#cash_check_total").text(store.currency.convertUISymbol(currentCashCheck.count()));
}

Template.cash_check.helpers({
	bills: function() {
		return store.currency.bills;
	},
	coins: function() {
		return store.currency.coins;
	},
});

Template.cash_check.events({
	"click #save_cash_check": function(event) {  
		event.preventDefault();
		
		countTotal();  
		currentCashCheck.save(function() {
			Router.go("/welcome");
			FlashMessages.sendSuccess('New cash check recorded with id '+cashCheckId);			
		});
	},	
	"click #cancel_cash_check": function(event) {
		event.preventDefault();
		
		Router.go("/welcome");
	}
});

Template.billcoin.events({
	"change .billcoin-quantity": function(event) {
		var quantity=$(event.target).val();
		var billcoin_value=$(event.target).attr("data-billcoin-value");
		var billcoin_subtotal=parseInt(quantity)*parseInt(billcoin_value);
		$(event.target).next().text(store.currency.convertUISymbol(billcoin_subtotal));
		countTotal();
	},
});

