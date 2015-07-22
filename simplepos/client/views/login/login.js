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



/*******************************************************************************************/
Template.login.rendered=function() {
	$("#store_selector_block").hide();
}

Template.login.helpers({
	stores: function() {
		return [	
			{ store_id: "lalaib2894l24s", store_name: "Alcalá 402"},
			{ store_id: "ua2j5lsjsoi8fZ", store_name: "Francisco Silvela, 17"},
		];
	}
});

Template.login.events({
	"click #btn_login": function() {
		// Si el login tiene éxito, recuperamos las tiendas a las que está autorizado el usuario y mostramos el bloque de selección de tienda
		$("#store_selector_block").show();
	},
	"change #store_selector": function(event) {    console.log($(event.target).val());
		if($(event.target).val()!="") {
			Router.go("/welcome");
		}
	}
});
