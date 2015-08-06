Template.company_form.helpers({
	currencyId: function() {
		return Session.get("currency_id");
	},
	currency: function() {
		if(Session.get("currency_id")==undefined) {
			return "No currency selected";
		} else {
			var currency=Currencies.findOne(Session.get("currency_id"));
			return currency.toString();		
		}	
	},
	taxAddressId: function() {
		return Session.get("address")._id;
	},
	taxAddress: function() {
		if(Session.get("address")==undefined) {
			return "No address selected";
		} else {
			var address=new Address(Session.get("address"));
			return address.toString();		
		}
	}
});


Template.company_form.events({   
	"click #btn_currency_select": function(event,template) {
		event.preventDefault();
		$("#currency_selector").modal('show');
	},
	"click #btn_address_form": function(event,template) {
		event.preventDefault();
		$("#address_form").modal('show');
	},
	"click #btn_company_save": function(event,template) {
		event.preventDefault();
		
		this.set("currencyId",template.find("#currency_id").value);
		this.set("taxNbr",template.find("#tax_nbr").value);
		this.set("taxName",template.find("#tax_name").value);
		this.set("taxAddressId",template.find("#tax_address_id").value);
		this.set("commercialName",template.find("#commercial_name").value);			
		this.set("logo",template.find("#logo").value);			
				
		this.validateAll()
			
		if(this.hasValidationErrors()) {
			_.each(this.getValidationErrors(),function(value,key) { 
				template.$("#"+key).parent().addClass("has-error");
				template.$("#"+key).tooltip({ title: value, placement: "bottom"});
			});
		} else {
			template.$('.has-error').removeClass('has-error');
			// habria que quitar tambien las tooltips con los errores con  .tooltip('destroy') pero no está claro cómo seleccionar los elementos con tooltip
			Meteor.call("companySave",this);		
			// a continuación lo suyo sería rediccionar a algun sitio (y que este sitio fuese parametrizable) o si es una modal que se cierre y ya
		}
	}, 
	"click #btn_company_cancel": function(event,template) {  
		Router.go("/welcome");
	}
});