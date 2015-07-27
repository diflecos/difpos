/* accountsUIBootstrap3.setLanguage('es'); 

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
 */


/*******************************************************************************************/
/* Template.login.rendered=function() {  
	$("#store_selector_block").hide();
} */

Template.login.helpers({
	stores: function() {		
		return Stores.find({},{});
	}
});

Template.login.events({
	"click #btn_login": function() {
		var username=Template.instance().find("#username").value;
		var password=Template.instance().find("#password").value;
		
		Meteor.loginWithPassword(username,password,function() {
			if(Meteor.user()!=null) {		
				$("#store_selector_block").show();			
			} else {
				FlashMessages.sendError("No user was found with this username and password, please retry");
			}
		});		
		// Si el login tiene éxito, recuperamos las tiendas a las que está autorizado el usuario y mostramos el bloque de selección de tienda
	},
	"click #btn_logout": function() {
		// Meteor.logoutOtherClients();  // Hay que pensarlo bien si esto interesa hacerlo o no...
		Meteor.logout();
	},
	"click .store": function(event) {   
		event.preventDefault();
		
		var storeId=$(event.target).data("store-id"); 
		var selected_store=Stores.findOne(storeId);
		if(selected_store!=undefined) {
			store=new Store(selected_store);
			localStorage.setItem("currentStore",EJSON.stringify(store));
			Router.go("/cash/check");
		}
	}
});
