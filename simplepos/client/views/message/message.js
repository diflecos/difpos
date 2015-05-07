Template.messagebox.events({
	"click .close": function(event) {
		Router.go(Session.get('onCancel'));
		$("#messagebox").on('closed.bs.alert', function (e) {
			Blaze.remove(messagebox);
		}).alert('close');
	}
});

Template.messagebox.rendered=function() {
	Router.go(Session.get('onCancel'));
/* 	$("#messagebox").fadeTo(2000, 500).slideUp(500, function(){
		$("#messagebox").on('closed.bs.alert', function (e) {
			Blaze.remove(messagebox);
		}).alert('close');
	}); */
};