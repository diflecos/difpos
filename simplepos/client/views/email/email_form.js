Template.email_form.rendered=function() {
	$("#email_form").modal();
}
	
Template.email_form.events({
	"click #btn_email_save": function(event,template) {
		event.preventDefault();
		
		this.set("name",template.find("#name").value);
		this.set("email",template.find("#email").value);		
				
		this.validateAll()
			
		if(this.hasValidationErrors()) {
			_.each(this.getValidationErrors(),function(value,key) {  console.log(value);
				template.$("#"+key).parent().addClass("has-error");
				template.$("#"+key).tooltip({ title: value, placement: "bottom"});
			});
		} else {
			template.$('.has-error').removeClass('has-error');
			// habria que quitar tambien las tooltips con los errores con  .tooltip('destroy') pero no está claro cómo seleccionar los elementos con tooltip
			Meteor.call("emailSave",this,function(error,result) {
				if(!error) {
					var emailId=result._id;
					Session.set("email_id",emailId);
					Session.set("email",result.email);
					$("#email_form").on('hidden.bs.modal', function (e) {
						Router.go(navigation.last());
					}).modal('hide');						
				}
			});					
		}
	}, 
	"click #btn_email_cancel": function(event,template) {  	
		$("#email_form").on('hidden.bs.modal', function (e) {
			Router.go(navigation.last());
		}).modal('hide');	
	}	
});