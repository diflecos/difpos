Template.brand_form.helpers({
	customerCarePhoneId: function() {
		if(Session.get('phone_id')!=undefined)
			this.set('customerCarePhoneId',Session.get('phone_id'));
		return (this.customerCarePhoneId==undefined)?'create':this.customerCarePhoneId;
	},
	customerCarePhone: function() {
		return (this.customerCarePhoneId==undefined)?'No phone':this.customerCarePhone.display();
	},
	customerCareEmailId: function() {
		if(Session.get('email_id')!=undefined)
			this.set('customerCareEmailId',Session.get('email_id'));
		return (this.customerCareEmailId==undefined)?'create':this.customerCareEmailId;
	},
	customerCareEmail: function() {
		return (this.customerCareEmailId==undefined)?'No email':this.customerCareEmail.display();
	},
	socials: function() {
		if(Session.get('social_id')!=undefined) {
			this.socialIds=_.uniq(this.socialIds.push(Session.get('social_id')));  // Metemos el id que haya en la variable de session en la lista pero por si acaso eliminamos duplicados no siendo qué
		}
		return this.socialIds;
	},
	social_display: function() {  //console.log('social_display: '+Socials.findOne(this).display());
		return (this==undefined)?'':Socials.findOne({"_id": this}).display();
	}, 
});

Template.brand_form.events({
	'keyup #name, change #name, focus #name': function(event,template) {
		this.set('name',template.find('#name').value);
		this.validate('name');
	},
	'keyup #logo, change #logo, focus #logo': function(event,template) {
		this.set('logo',template.find('#logo').value);
		this.validate('logo');
	},
	'keyup #url, change #url, focus #url': function(event,template) {
		this.set('url',template.find('#url').value);
		this.validate('url');
	},
	'click #btn_brand_save': function(event,template) {
		event.preventDefault();
		
		this.set('name',template.find('#name').value);
		this.set('logo',template.find('#logo').value);
		this.set('url',template.find('#url').value);		
		this.set('customerCarePhoneId',template.find('#customer_care_phone_id').value);		
		this.set('customerCareEmailId',template.find('#customer_care_email_id').value);			
		this.set('socialId',template.find('#social_id').value);		
				
		this.validateAll();
			
		if(!this.hasValidationErrors()) {
			Meteor.call('brandSave',this,function(error,result) {
				if(!error) {
					var brandId=result._id;
					Router.go(navigation.last());
				}
			});					
		}
	}, 
	'click #btn_brand_cancel': function(event,template) {  	
		Router.go(navigation.last());			
	}
});
