Template.address_form.rendered=function() {
	$("#address_form").modal();
}

Template.address_form.events({
	"click #btn_address_save": function(event,template) {
		event.preventDefault();
		
		this.set("name",template.find("#name").value);
		this.set("street",template.find("#street").value);
		this.set("town",template.find("#town").value);
		this.set("zipcode",template.find("#zipcode").value);
		this.set("country",template.find("#country").value);			
				
		this.validateAll()
			
		if(this.hasValidationErrors()) {
			_.each(this.getValidationErrors(),function(value,key) {  console.log(value);
				template.$("#"+key).parent().addClass("has-error");
				template.$("#"+key).tooltip({ title: value, placement: "bottom"});
			});
		} else {
			template.$('.has-error').removeClass('has-error');
			// habria que quitar tambien las tooltips con los errores con  .tooltip('destroy') pero no está claro cómo seleccionar los elementos con tooltip
			Meteor.call("addressSave",this);		
			// a continuación lo suyo sería rediccionar a algun sitio (y que este sitio fuese parametrizable) o si es una modal que se cierre y ya
		}
	}, 
	"click #btn_address_cancel": function(event,template) {  
		$('#address_form').on('hidden.bs.modal', function (e) {
			Blaze.remove(modal);  // parece que no está funcionando
			//$("#modal").children().remove();  // por si acaso vaciamos #modal a capón con jquery
		})		
		$("#address_form").modal('hide');	
	}
});