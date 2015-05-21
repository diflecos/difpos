Template.fullperson_view.events({
	"click #btn_update_fullperson": function() {
		Router.go("/fullperson/update/"+this._id);
	}
});

Template.fullperson_view.rendered=function() {
	Session.set('onCancel','/fullperson/'+this._id);
}