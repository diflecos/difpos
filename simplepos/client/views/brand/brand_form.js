Template.brand_form.helpers({
	customerCarePhoneId: function() {
		if(Session.get('phone_id')!=undefined)
			this.set('customerCarePhoneId',Session.get('phone_id'));
		
		return (this.customerCarePhoneId=='')?'':this.customerCarePhoneId;
	},
	customerCarePhone: function() {
		if(Session.get('phone_id')!=undefined) 
			this.set('customerCarePhoneId',Session.get('phone_id'));

		var phone=Phones.findOne(this.get('customerCarePhoneId'));
		if(phone!=undefined) {
			return phone.display();
		} else {
			return 'No phone';
		}
	},
	customerCareEmailId: function() {
		if(Session.get('email_id')!=undefined)
			this.set('customerCareEmailId',Session.get('email_id'));
		
		return (this.customerCareEmailId=='')?'':this.customerCareEmailId;
	},
	customerCareEmail: function() {
		if(Session.get('email_id')!=undefined) 
			this.set('customerCareEmailId',Session.get('email_id'));

		var email=Emails.findOne(this.get('customerCareEmailId'));
		if(email!=undefined) {
			return email.display();
		} else {
			return 'No email';
		}
	},	
	socialIds: function() {
		if(Session.get('social_id')!=undefined)
			this.set('socialIds',Session.get('social_id'));
		
		return (this.socialIds=='')?'':this.socialIds;
	},
	customerCareEmail: function() {
		if(Session.get('email_id')!=undefined) 
			this.set('customerCareEmailId',Session.get('email_id'));

		var email=Emails.findOne(this.get('customerCareEmailId'));
		if(email!=undefined) {
			return email.display();
		} else {
			return 'No email';
		}
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
	'click #btn_phone_form': function(event,template) {
		var phone;
		var phone_id=template.find('#customer_care_phone_id').value;   
		if(phone_id=='' || phone_id==undefined) {
			phone=new Phone({});
		} else {
			phone=Phones.findOne({_id: phone_id});
			phone.validate();  // esto es necesario para forzar que la variable esté asociada con el modelo y que no salte excepción
		}		
		Blaze.renderWithData(Template.phone_form,phone,$('#modal')[0]); 
	},
	'click #btn_email_form': function(event,template) {
		var email;
		var email_id=template.find('#customer_care_email_id').value;   
		if(email_id=='' || email_id==undefined) {
			email=new Email({});
		} else {
			email=Emails.findOne({_id: email_id});
			email.validate();  // esto es necesario para forzar que la variable esté asociada con el modelo y que no salte excepción
		}		
		Blaze.renderWithData(Template.email_form,email,$('#modal')[0]); 
	},
	'click #btn_social_form': function(event,template) {
		var social;
		var social_id=template.find('#social_id').value;   
		if(social_id=='' || social_id==undefined) {
			social=new Social({});
		} else {
			social=Socials.findOne({_id: social_id});
			social.validate();  // esto es necesario para forzar que la variable esté asociada con el modelo y que no salte excepción
		}		
		Blaze.renderWithData(Template.social_form,social,$('#modal')[0]); 
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
