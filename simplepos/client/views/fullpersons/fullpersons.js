Template.fullpersons_index.events({
	"click #btn_create": function() {
		if($("#person_create_modal").length>0) {
			Template.person_create_modal.rendered();
		} else {
			Blaze.render(Template.person_create_modal,document.body);
		}
	}
});

Template.fullpersons.events({
	"change .filter": function(event) {
		var field=event.target.id;
		var filter=event.target.value;
		FullPersonsPages.filters["person."+field]= {$eq: filter};
	}
});

Template.fullpersons_item_template.events({
	"click tr": function() {
		Router.go("/fullperson/"+this._id);
	}
});

