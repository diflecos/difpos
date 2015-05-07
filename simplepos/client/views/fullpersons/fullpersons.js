Template.fullpersons_index.events({
	"click #btn_create": function() {
		Session.set('onCancel','/fullpersons');
		Router.go('person.create');
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
	"click .btn-view": function() {
		Session.set('onCancel','/fullpersons');
		Router.go("/fullperson/"+this._id);
	}, 	
	"click .btn-update": function() {
		Session.set('onCancel','/fullpersons');
		Router.go("/person/update/"+this._id);
	}, 
	"click .btn-delete": function() {
		Router.go("/person/delete/"+this._id);
	}
});

