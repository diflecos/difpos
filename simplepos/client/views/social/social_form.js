Template.social_form.rendered=function() {  
	self=this;
	var social_form_template=this.view;
	$('#social_form').on('hidden.bs.modal', function (event) {   	
		Blaze.remove(social_form_template);	
	});		
	$('#social_form').modal('show');
}

Template.social_form.helpers({
	social_type: function() {
		return OPTIONS.PHONE_TYPE;
	},
	type_checked: function() {  
		return (Template.parentData(1).type==this.value)?'checked':'';
	}
});

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
		
		self=this;
		self.set('_id',template.find('#_id').value);    
		self.set('name',template.find('#name').value);
		self.set('nbr',template.find('#value').value);		
		
		self.validateAll();
		
		if(!self.hasValidationErrors()) {
			Meteor.call('socialSave',self,function(error,result) {  
				if(!error) {
					Session.set('social_id',result._id);
					$('#social_form').modal('hide');
				} else {
					throw Meteor.Error('social-save-error',error);
				}
			});					
		}
	}, 
	'click #btn_social_cancel': function(event,template) {  	
		$('#social_form').modal('hide');	
	}
});