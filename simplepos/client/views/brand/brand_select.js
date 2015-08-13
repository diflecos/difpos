Template.brand_select.rendered=function () {
	$("#brand_select").modal('show');
}

Template.brand_select.helpers({
	brands: function() {
		return Brands.find();
	}
});

Template.brand_select.events({
	"click .brand": function(event) {   
		var brandId=$(event.target).data("brand-id"); 
		Session.set("brand_id",brandId);
		$("#brand_select").on('hidden.bs.modal', function (e) {
			Router.go(navigation.last());
		}).modal('hide');
	}
});
