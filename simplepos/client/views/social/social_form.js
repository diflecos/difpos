Template.social_form.rendered=function() {
	$("#social_form").modal();
}

Template.social_form.events({
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
	"click #btn_social_save": function(event,template) {
		event.preventDefault();
		
		this.set("name",template.find("#name").value);
		this.set("value",template.find("#value").value);	
				
		this.validateAll()
			
		if(this.hasValidationErrors()) {
			_.each(this.getValidationErrors(),function(value,key) {  console.log(value);
				template.$("#"+key).parent().addClass("has-error");
				template.$("#"+key).tooltip({ title: value, placement: "bottom"});
			});
		} else {
			template.$('.has-error').removeClass('has-error');
			// habria que quitar tambien las tooltips con los errores con  .tooltip('destroy') pero no está claro cómo seleccionar los elementos con tooltip
			Meteor.call("socialSave",this,function(error,result) {
				if(!error) {
					var socialId=result._id;
					Session.set("social_id",socialId);
					Session.set("social",result.display());
					$("#social_form").on('hidden.bs.modal', function (e) {
						Router.go(navigation.last());
					}).modal('hide');						
				}
			});					
		}
	}, 
	"click #btn_social_cancel": function(event,template) {  	
		$("#social_form").on('hidden.bs.modal', function (e) {
			Router.go(navigation.last());
		}).modal('hide');	
	}
});