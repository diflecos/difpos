accountsUIBootstrap3.setLanguage('es'); 

accountsUIBootstrap3.logoutCallback = function(error) {
  if(error) console.log("Error:" + error);
  Router.go('/');
}



Accounts.ui.config({
	passwordSignupFields: 'USERNAME_ONLY',
});

Accounts.onLogin(function() {
//	Router.go('/welcome');
});

