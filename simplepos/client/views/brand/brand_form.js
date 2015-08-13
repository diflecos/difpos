Template.brand_form.helpers({
	phoneId: function() {
		if(Session.get("phone_id")!=undefined)
			this.customerCarePhoneId=Session.get("phone_id");
		return (this.customerCarePhoneId==undefined)?"create":this.customerCarePhoneId;
	},
	phone: function() {
		return (this.customerCarePhoneId==undefined)?Session.get("phone"):this.customerCarePhone.display();
	},
	emailId: function() {
		return (this.customerCareEmailId==undefined)?Session.get("email_id"):this.customerCareEmailId;
	},
	email: function() {
		return (this.customerCareEmailId==undefined)?Session.get("email"):this.customerCareEmail.display();
	},
/* 	esto es para hacer la parte de socials
	phoneId: function() {
		return (this.customerCarePhoneId==undefined)?Session.get("phone_id"):this.customerCarePhoneId;
	},
	phone: function() {
		return (this.customerCarePhoneId==undefined)?Session.get("phone"):this.customerCarePhone.display();
	}, */
});

Template.brand_form.events({

});
