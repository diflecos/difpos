Template.brand_view.helpers({
	socials: function() {
		return this.socials;
	},
	customerCarePhone: function() {
		return Phones.findOne(this.customerCarePhoneId);
	},
	customerCareEmail: function() {
		return Emails.findOne(this.customerCareEmailId);
	}
});
