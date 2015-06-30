Template.payment.rendered=function() {
	$('#payment-tablist a[href="#'+PARAMS.PAYMENT_DEFAULTMETHOD+'-tab"]').tab('show');
	$('#payment-tablist a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	});
}

Template.payment.helpers({
	restToSettle: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.final_price-currentOrderInSession.paid;
	},
	toBeReturned: function(given) {
		var paying=$("#amount_to_pay").val();
		var given=Session.get("customer_gives");
		
		if(given!="" && given!=undefined) {
			return (given-paying)>0?given-paying:"0.00";
		} else {
			return "0,00";
		}
	}
});

Template.payment.events({
	"keyup #customer_gives": function() {
		Session.set("customer_gives",$("#customer_gives").val())
	},
	"click #add_cash_trx": function(event) {
		event.preventDefault();
		
		var paying=$("#amount_to_pay").val();
		var given=Session.get("customer_gives");
		
		var cash_payment_details=new CashPaymentDetails(given,paying);
		var trx=new PaymentTrx("Cash",paying,cash_payment_details);
		currentOrder.addPaymentTrx(trx);
		Session.set("currentOrder",currentOrder);
		$("#beep")[0].play();
	},
	"click #add_credit_card_trx": function(event) {
		event.preventDefault();
		
		var paying=$("#amount_to_pay").val();
		var trx=new PaymentTrx("CreditCard",paying,{});

		currentOrder.addPaymentTrx(trx);
		Session.set("currentOrder",currentOrder);
		$("#beep")[0].play();
	},	
});
