Template.fullpersons.rendered=function() {
	Session.set('onCancel','/fullpersons');
}

Template.fullpersons.events({
	"change .filter": function(event) {
		var field=event.target.id;
		var filter=event.target.value;
		FullPersonsPages.filters["person."+field]= {$eq: filter};
	}
});

Template.fullpersons_index.events({
	"click #btn_create": function() {
		Router.go('fullperson_create');
	}
});

Template.fullpersons_item_template.events({
	"click .btn-view": function() {
		Router.go("/fullperson/"+this._id);
	}, 	
	"click .btn-update": function() {
		Router.go("/fullperson/update/"+this._id);
	}, 
	"click .btn-delete": function() {
		Router.go("/person/delete/"+this._id);
	}
});

