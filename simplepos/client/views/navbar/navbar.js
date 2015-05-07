Template.navbar.rendered = function() {
  Meteor.setInterval( function() {
    Session.set("now", moment(new Date()).format('DD/MM/YYYY HH:mm:ss'));
  }, 1000);
};

Template.navbar.helpers({
	clientIP: function() {
		return "IP unavailable";
	},
	currentTime: function() {
		return Session.get("now");
	}
});

