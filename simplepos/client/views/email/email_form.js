Template.email_form.rendered=function() {  
	self=this;
	var email_form_template=this.view;
	$('#email_form').on('hidden.bs.modal', function (event) {   	
		Blaze.remove(email_form_template);	
	});		
	$('#email_form').modal('show');
}

Template.email_form.helpers({
	email_type: function() {
		return OPTIONS.PHONE_TYPE;
	},
	type_checked: function() {  
		return (Template.parentData(1).type==this.value)?'checked':'';
	}
});

Template.email_form.events({
	'keyup #name, change #name, focus #name': function(event,template) {
		this.set('name',template.find('#name').value);
		this.validate('name');
	},
	'keyup #email, change #email, focus #email': function(event,template) {
		this.set('email',template.find('#email').value);
		this.validate('email');
	},
	'click #btn_email_save': function(event,template) {
		event.preventDefault();
		
		self=this;
		self.set('_id',template.find('#_id').value);    
		self.set('name',template.find('#name').value);
		self.set('email',template.find('#email').value);
		
		self.validateAll();
		
		if(!self.hasValidationErrors()) {
			Meteor.call('emailSave',self,function(error,result) {  
				if(!error) {
					Session.set('email_id',result._id);
					$('#email_form').modal('hide');
				} else {
					throw Meteor.Error('email-save-error',error);
				}
			});					
		}
	}, 
	'click #btn_email_cancel': function(event,template) {  	
		$('#email_form').modal('hide');	
	}
});