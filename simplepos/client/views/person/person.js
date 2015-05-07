Template.person.events({
	"click #btn_update": function() {
		if($("#person_create_modal").length>0) {
			Template.person_create_modal.rendered();
		} else {
			Blaze.render(Template.person_create_modal,document.body);
		}
	}
});