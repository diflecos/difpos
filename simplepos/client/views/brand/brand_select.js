Template.brand_selector.rendered=function () {
	$("#brand_selector").modal('show');
}

Template.brand_selector.helpers({
	brands: function() {
		return Brands.find();
	}
});

Template.brand_selector.events({
	"click .brand": function(event) {   
		var brandId=$(event.target).data("brand-id"); 
		Session.set("brand_id",brandId);
		$("#brand_selector").on('hidden.bs.modal', function (e) {
			Router.go(navigation.last());
		}).modal('hide');
	}
});
