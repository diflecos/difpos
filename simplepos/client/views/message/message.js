Template.messagebox.events({
	"click .close": function(event) {
		$("#messagebox").on('closed.bs.alert', function (e) {
			Blaze.remove(messagebox);
		}).alert('close');
	}
});

Template.messagebox.rendered=function() {
	$("#messagebox").fadeTo(4000, 500).slideUp(500, function(){
		$("#messagebox").on('closed.bs.alert', function (e) {
			Blaze.remove(messagebox);
		}).alert('close');
	});
};