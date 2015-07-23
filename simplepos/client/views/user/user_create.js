Template.user_create.events({
	"click #btn_create_user": function(event) {  
		event.preventDefault();
		
		var username=Template.instance().find("#username").value;
		var password=Template.instance().find("#password").value; 
		
		Meteor.call('userAdd',username,password,function(error, result){
			// TODO: ver qué hacemos en caso de error!
			var userId = result;
			FlashMessages.sendSuccess('New user created with id '+userId);	
		});	
	},
});