Template.phone_form.rendered=function() {
	$("#phone_form").modal();
}

Template.phone_form.events({
	"keyup #name": function(event,template) {
		this.set("name",template.find("#name").value);
		this.validate('name');
	},
	"keyup #prefix": function(event,template) {
		this.set("prefix",template.find("#prefix").value);
		this.validate('prefix');
	},
	"keyup #nbr": function(event,template) {
		this.set("nbr",template.find("#nbr").value);
		this.validate('nbr');
	},
	"click #btn_phone_save": function(event,template) {
		event.preventDefault();
		
		this.set("name",template.find("#name").value);
		this.set("prefix",template.find("#prefix").value);
		this.set("nbr",template.find("#nbr").value);		
				
		this.validateAll();
			
		if(!this.hasValidationErrors()) {
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