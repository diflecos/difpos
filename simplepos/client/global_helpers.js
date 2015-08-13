Template.registerHelper('userIsAdmin', function(date) {
	return true;
});

Template.registerHelper('localizedDateAndTime', function(date) {
    if(date)
        return moment(date).format(PARAMS.DATETIME_FORMAT);
});

Template.registerHelper('username', function(id) {
    if(id) {
		var user=Meteor.users.findOne(id);
		if(user!=undefined) {
			return user.username;		
		}
    }
});