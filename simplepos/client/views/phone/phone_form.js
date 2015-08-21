Template.phone_form.rendered=function() {  	console.log('rendered')
/* 	$('#phone_form').on('hidden.bs.modal', function (e) {   console.log('hiding: '+navigation.display())
		var last=navigation.last()
	//	Router.go(last);
	});		 */
	
	$('#phone_form').modal();
	

}

Template.phone_form.events({
	'keyup #name, change #name, focus #name': function(event,template) {
		this.set('name',template.find('#name').value);
		this.validate('name');
	},
	'keyup #prefix, change #prefix, focus #prefix': function(event,template) {
		this.set('prefix',template.find('#prefix').value);
		this.validate('prefix');
	},
	'keyup #nbr, change #nbr, focus #nbr': function(event,template) {
		this.set('nbr',template.find('#nbr').value);
		this.validate('nbr');
	},
	'click #btn_phone_save': function(event,template) {
		event.preventDefault();
		
		this.set('name',template.find('#name').value);
		this.set('prefix',template.find('#prefix').value);
		this.set('nbr',template.find('#nbr').value);		
				
		this.validateAll();

		if(!this.hasValidationErrors()) {
			Meteor.call('phoneSave',this,function(error,result) {
				if(!error) {
					var phoneId=result._id;
					Session.set('phone_id',phoneId);
					Session.set('phone',result.display());
					$('#phone_form').modal('hide');						
				} else {
					throw Meteor.error('phone-save-error',error);
				}
			});					
		}
	}, 
	'click #btn_phone_cancel': function(event,template) {  	
		$('#phone_form').modal('hide');	
	}
});