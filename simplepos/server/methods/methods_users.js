Meteor.methods({
	userAdd: function(username,password) {  console.log(username+","+password+"<-------------")
		userId=Accounts.createUser({
			"username": username,
			"password": password,
		});		
		console.log(userId);
		return userId;
	},
	userName: function(userId) {
	
	},
	userRemove: function(userId) {
	
	}
});
