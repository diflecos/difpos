Template.phone_select.rendered=function () {
	$("#phone_select").modal('show');
}

Template.phone_select.helpers({
	phones: function() {
		return Phones.find();
	}, 
});

Template.phone_select_option.helpers({
	phone_display: function() {
		return this.display();
	}, 
});

Template.phone_select.events({
	"click .phone": function(event) {   
		var phoneId=$(event.target).data("phone-id"); 
		Session.set("phone_id",phoneId);
		$("#phone_select").on('hidden.bs.modal', function (e) {
			Router.go(navigation.last());
		}).modal('hide');
	}
});
