Template.navbar.rendered = function() {
  Meteor.setInterval( function() {
    Session.set("now", moment(new Date()).format('DD/MM/YYYY HH:mm:ss'));
  }, 1000);
};

Template.navbar.helpers({
	store_name: function() {
		return store.name;
	},
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
		if(Meteor.status().connected) {
			Meteor.disconnect();
			FlashMessages.sendError("No server connection");
		} else {
			Meteor.reconnect();
			FlashMessages.sendSuccess('Reconnecting with the server: '+Meteor.status().status+" "+Meteor.status().reason);						
		}
	}
});


