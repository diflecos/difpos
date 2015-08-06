Template.phone_form.rendered=function() {
	$("#phone_form").modal();
}

Template.phone_form.events({
	"click #btn_phone_save": function(event,template) {
		event.preventDefault();
		
		this.set("name",template.find("#name").value);
		this.set("prefix",template.find("#prefix").value);
		this.set("nbr",template.find("#nbr").value);		
				
		this.validateAll()
			
		if(this.hasValidationErrors()) {
			_.each(this.getValidationErrors(),function(value,key) {  console.log(value);
				template.$("#"+key).parent().addClass("has-error");
				template.$("#"+key).tooltip({ title: value, placement: "bottom"});
			});
		} else {
			template.$('.has-error').removeClass('has-error');
			// habria que quitar tambien las tooltips con los errores con  .tooltip('destroy') pero no est� claro c�mo seleccionar los elementos con tooltip
			Meteor.call("phoneSave",this);		
			// a continuaci�n lo suyo ser�a rediccionar a algun sitio (y que este sitio fuese parametrizable) o si es una modal que se cierre y ya
		}
	}, 
	"click #btn_phone_cancel": function(event,template) {  
		$('#phone_form').on('hidden.bs.modal', function (e) {
			Blaze.remove(modal);  // parece que no est� funcionando
			//$("#modal").children().remove();  // por si acaso vaciamos #modal a cap�n con jquery
		})		
		$("#phone_form").modal('hide');	
	}
});