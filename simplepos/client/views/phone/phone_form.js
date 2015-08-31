Template.phone_form.rendered=function() {  
	self=this;
	var phone_form_template=this.view;
	$('#phone_form').on('hidden.bs.modal', function (event) {   	
		Blaze.remove(phone_form_template);	
	});		
	$('#phone_form').modal('show');
}

Template.phone_form.helpers({
	phone_type: function() {
		return OPTIONS.PHONE_TYPE;
	},
	type_checked: function() {  
		return (Template.parentData(1).type==this.value)?'checked':'';
	}
});

Template.phone_form.events({
	'keyup #name, change #name, focus #name': function(event,template) {
		this.set('name',template.find('#name').value);
		this.validate('name');
	},
	'keyup #prefix, change #prefix, focus #prefix': function(event,template) {
		this.set('prefix',template.find('#prefix').value);   console.log(this.get('prefix'));
		this.validate('prefix');  console.log(this.get('prefix'));
		console.log(this.getValidationError('prefix'))
	},
	'keyup #nbr, change #nbr, focus #nbr': function(event,template) {
		this.set('nbr',template.find('#nbr').value);
		this.validate('nbr');
	},
	'keyup #type, change #type, focus #type': function(event,template) {
		this.set('type',self.set('type',template.find('input:radio[name=type]:checked').value));
		this.validate('type');
	},
	'click #btn_phone_save': function(event,template) {
		event.preventDefault();
		
		self=this;
		self.set('_id',template.find('#_id').value);    
		self.set('name',template.find('#name').value);
		self.set('prefix',template.find('#prefix').value);
		self.set('nbr',template.find('#nbr').value);		
		self.set('type',template.find('input:radio[name=type]:checked').value);		
		
		self.validateAll();
		
		if(!self.hasValidationErrors()) {
			Meteor.call('phoneSave',self,function(error,result) {  
				if(!error) {
					Session.set('phone_id',result._id);
					$('#phone_form').modal('hide');
				} else {
					throw Meteor.Error('phone-save-error',error);
				}
			});					
		}
	}, 
	'click #btn_phone_cancel': function(event,template) {  	
		$('#phone_form').modal('hide');	
	}
});