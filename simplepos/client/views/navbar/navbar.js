Template.navbar.rendered = function() {
  Meteor.setInterval( function() {
    Session.set("now", moment(new Date()).format('DD/MM/YYYY HH:mm:ss'));
  }, 1000);
};

Template.navbar.helpers({
	clientIP: function() {
		Meteor.call('getIP', function(error, result){
			if(error){
				return "IP undefined";
			} else {
				Session.set("ip", result);
			}
		});

		var ip = Session.get("ip");	
		return ip;
	},
	currentTime: function() {
		return Session.get("now");
	}, 
	connected: function() {
		return Meteor.status().connected;
	}
});

Template.navbar.events({
	"click #toggle_connexion": function() {
		if(messagebox.keys != undefined)
			Blaze.remove(messagebox); // si hay mensajes anteriores los borramos	
		if(Meteor.status().connected) {
			Meteor.disconnect();
			messagebox={
				'message': 'No server connection',
				'message_type': 'danger'
			};
			Session.set('messagebox',messagebox);
		} else {
			Meteor.reconnect();
			messagebox={
				'message': 'Reconnecting with the server: '+Meteor.status().status+" "+Meteor.status().reason,
				'message_type': 'success'
			};
			Session.set('messagebox',messagebox);						
		}
	}
});


