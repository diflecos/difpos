Template.social_form.rendered=function() {
	$("#social_form").modal();
}

Template.social_form.events({
	'keyup #name, change #name, focus #name': function(event,template) {
		this.set('name',template.find('#name').value);
		this.validate('name');
	},
	'keyup #value, change #value, focus #value': function(event,template) {
		this.set('value',template.find('#value').value);
		this.validate('value');
	},
	'click #btn_social_save': function(event,template) {
		event.preventDefault();
		
		this.set('name',template.find('#name').value);
		this.set('value',template.find('#value').value);
				
		this.validateAll();

		if(!this.hasValidationErrors()) {
			Meteor.call('socialSave',this,function(error,result) {
				if(!error) {
					var socialId=result._id;
					Session.set('social_id',socialId);
					Session.set('social',result.display());
					$('#social_form').modal('hide');						
				} else {
					throw Meteor.error('social-save-error',error);
				}
			});					
		}
	}, 
	'click #btn_social_cancel': function(event,template) {  	
		$('#social_form').modal('hide');	
	}
});