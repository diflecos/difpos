Template.person_view.events({
	"click #btn_update": function() {
		if($("#person_create_modal").length>0) {
			Template.person_create_modal.rendered();
		} else {
			Blaze.renderWithData(Template.person_create_modal,{mode: "update"},document.body);
		}
	}
});