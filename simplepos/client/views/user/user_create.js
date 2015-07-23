Template.user_create.events({
	"click #btn_create_user": function(event) {  
		event.preventDefault();
		
		var usernameVar=Template.instance().find("#username").value;
		var passwordVar=Template.instance().find("#password").value; 
		
		Meteor.call('userAdd',{username: usernameVar, password: passwordVar},function(error, result){
			// TODO: ver qué hacemos en caso de error!
			var userId = result;
			FlashMessages.sendSuccess('New user created with id '+userId);	
		});	
	},
});