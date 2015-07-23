Template.login.events({
	"click #btn_create_user": function(event) {
		event.preventDefault();
		
		var usernameVar=Template.instance().find("#username").value;
		var passwordVar=Template.instance().find("#password").value;
		
		Accounts.createUser({
			username: usernameVar,
			password: passwordVar
		});
	},
});