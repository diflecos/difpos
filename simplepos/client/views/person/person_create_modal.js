Template.person_create_modal.events({
	"submit form#person_form": function(event) {
		event.preventDefault();
		fullperson_id=FullPersons.insert({
			person: {
				name: 			event.target.name.value,
				family_name: 	event.target.family_name.value,
				nick: 			event.target.nick.value,
				id_nbr: 		event.target.id_nbr.value,
				birthdate: 		event.target.birthdate.value,
				gender: 		event.target.gender.value,
				civil_status: 	event.target.civil_status.value,
			}
		});
		
		$("#person_create_modal").modal("hide");
		Router.go('fullperson.view',{"_id": fullperson_id});
		return false;	
	},
	"click .submit": function(event) {
		$("form#person_form").submit();
	},
	"click .cancel": function(event) {
		$("#person_create_modal").modal("hide");
		Router.go(Session.get('onCancel'));
	}
});

Template.person_create_modal.rendered=function() {
	$("#person_create_modal").modal("show");
};