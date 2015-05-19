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
		if(Meteor.status().connected) {
			Meteor.disconnect();
			message="No server connection!";
			messagebox=Blaze.renderWithData(Template.messagebox,{'alertclass': 'danger','message': message},document.body);
		} else {
			Meteor.reconnect();
			message="Reconnecting with the server: "+Meteor.status().status+" "+Meteor.status().reason;
			messagebox=Blaze.renderWithData(Template.messagebox,{'alertclass': 'success','message': message},document.body);				
		}
	}
});


