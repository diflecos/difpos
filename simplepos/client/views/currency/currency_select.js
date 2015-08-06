Template.currency_selector.helpers({
	currencies: function() {
		return Currencies.find();
	}
});

Template.currency_selector.events({
	"click .currency": function(event) {   
		var currencyId=$(event.target).data("currency-id"); 
		Session.set("currency_id",currencyId);
		$("#currency_selector").modal('hide');
	}
});
