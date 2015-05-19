Template.messagebox.helpers({
	message: function() {
		if(Session.get("messagebox")!=undefined)
			return Session.get("messagebox").message;
		else 
			return '';
	},
	message_type: function() {
		if(Session.get("messagebox")!=undefined)
			return Session.get("messagebox").message_type;
		else 
			return '';
	}
});

Template.messagebox.events({
	"change": function(event) {
		console.log('cambió');
	},
	"click .close": function(event) {
		messagebox={
			'message': '',
			'message_type': ''
		};
		Session.set('messagebox',messagebox);
	}
});

Template.messagebox.rendered=function() {
	messagebox={
		'message': '',
		'message_type': ''
	};
	Session.set('messagebox',messagebox);
	$("#messagebox").fadeTo(4000, 500).slideUp(500, function(){	});
};