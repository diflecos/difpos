Template.currency_form.rendered=function() {
	$("#currency_form").modal();
}

Template.currency_form.events({
	"click #btn_currency_save": function(event,template) {
		event.preventDefault();
		
		this.set("name",template.find("#name").value);
		this.set("shortname",template.find("#shortname").value);
		this.set("symbol",template.find("#symbol").value);
		this.set("precision",template.find("#precision").value);			
		this.set("bills",template.find("#bills").value.split(','));			
		this.set("coins",template.find("#coins").value.split(','));			
				
		this.validateAll()
			
		if(this.hasValidationErrors()) {
			_.each(this.getValidationErrors(),function(value,key) {  console.log(value);
				template.$("#"+key).parent().addClass("has-error");
				template.$("#"+key).tooltip({ title: value, placement: "bottom"});
			});
		} else {
			template.$('.has-error').removeClass('has-error');
			// habria que quitar tambien las tooltips con los errores con  .tooltip('destroy') pero no está claro cómo seleccionar los elementos con tooltip
			Meteor.call("currencySave",this);		
			// a continuación lo suyo sería rediccionar a algun sitio (y que este sitio fuese parametrizable) o si es una modal que se cierre y ya
		}
	}, 
	"click #btn_currency_cancel": function(event,template) {  
		$("#currency_form").modal('hide');	
	}
});