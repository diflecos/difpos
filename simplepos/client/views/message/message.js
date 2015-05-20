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

Template.messagebox.rendered=function() {
	messagebox={
		'message': '',
		'message_type': '',
		'message_close': ''
	};
	Session.set('messagebox',messagebox);
};

Tracker.autorun(function () {
	if(Session.get('messagebox')!=undefined && Session.get('messagebox').message_close==='auto') {
		$("#messagebox").fadeTo(4000, 500).slideUp(500, function(){	
			messagebox={
				'message': '',
				'message_type': '',
				'message_close': ''
			};
			Session.set('messagebox',messagebox);		
			$("#messagebox").show();
		});
	}
});