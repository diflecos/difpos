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
		return currentOrder.currency.convertUI(parseInt(currentOrderInSession.final_price)-parseInt(currentOrderInSession.paid));
	},
	toBeReturned: function(given) {
		var payingUI=Session.get("amount_to_pay");
		var givenUI=Session.get("#customer_gives");
		
		if(given!="" && given!=undefined) {
			var payingDB=currentOrder.currency.convertDB(payingUI);  console.log(payingDB);
			var givenDB=currentOrder.currency.convertDB(givenUI);    console.log(givenDB);
			return (givenDB-payingDB)>0?currentOrder.currency.convertUI(givenDB-payingDB):currentOrder.currency.zeroUI;
		} else {
			return currentOrder.currency.zeroUI;  
		}
	}
});

Template.payment.events({
	"keyup #amount_to_pay": function() {
		Session.set("customer_gives",$("#customer_gives").val());
		Session.set("amount_to_pay",$("#amount_to_pay").val());
	},
	"keyup #customer_gives": function() {
		Session.set("customer_gives",$("#customer_gives").val());
		Session.set("amount_to_pay",$("#amount_to_pay").val());
	},
	"click #add_cash_trx": function(event) {
		event.preventDefault();
		
		var paying=$("#amount_to_pay").val();
		var given=$("#customer_gives").val();
		var payingDB=store.currency.convertDB(paying);
		var givenDB=store.currency.convertDB(given);
			
		var cash_payment_details=new CashPaymentDetails(currentOrder.currency,givenDB,payingDB);
		var trx=new PaymentTrx({type: "Cash", paid: payingDB, details: cash_payment_details});
		
		currentOrder.addPaymentTrx(trx);
		Session.set("currentOrder",currentOrder);
		$("#beep")[0].play();
	},
	"click #add_credit_card_trx": function(event) {
		event.preventDefault();
		
		var paying=$("#amount_to_pay").val();
		var payingDB=store.currency.convertDB(paying);
		var trx=new PaymentTrx("CreditCard",payingDB,{});

		currentOrder.addPaymentTrx(trx);
		Session.set("currentOrder",currentOrder);
		$("#beep")[0].play();
	},	
});
