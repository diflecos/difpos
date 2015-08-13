Template.phone_form.rendered=function() {
	$("#phone_form").modal();
}

Template.phone_form.events({
	"change #name": function(event,template) {
		this.set("name",template.find("#name").value);
		if(this.validate('name')) {
			template.$('#name').parent().addClass('has-success');
			template.$('#name').tooltip('destroy');
			template.$('#name_validation_sign').addClass('visible');
		} else {
			template.$('#name').parent().addClass('has-error');		
			template.$('#name').tooltip({ title: this.getValidationError('name'), placement: "bottom"});
		}
	},
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
			// habria que quitar tambien las tooltips con los errores con  .tooltip('destroy') pero no está claro cómo seleccionar los elementos con tooltip
			Meteor.call("phoneSave",this,function(error,result) {
				if(!error) {
					var phoneId=result._id;
					Session.set("phone_id",phoneId);
					Session.set("phone",result.display());
					$("#phone_form").on('hidden.bs.modal', function (e) {
						Router.go(navigation.last());
					}).modal('hide');						
				}
			});					
		}
	}, 
	"click #btn_phone_cancel": function(event,template) {  	
		$("#phone_form").on('hidden.bs.modal', function (e) {
			Router.go(navigation.last());
		}).modal('hide');	
	}
});