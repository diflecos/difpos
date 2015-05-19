Template.person_create_modal.helpers({
	mode_create: function() {
		return this.mode==='create';
	}
});

Template.person_create_modal.events({
	"submit form#person_form": function(event) {
		event.preventDefault();
		if(mode==="create") {
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
		} else {
			fullperson_id=event.target.name.value;
			fullperson=FullPersons.findOne({_id: fullperson_id});
			fullperson.update(fullperson_id,{$set: {
				person: {
					name: 			event.target.name.value,
					family_name: 	event.target.family_name.value,
					nick: 			event.target.nick.value,
					id_nbr: 		event.target.id_nbr.value,
					birthdate: 		event.target.birthdate.value,
					gender: 		event.target.gender.value,
					civil_status: 	event.target.civil_status.value,
				}			
			}});
		}
		
		$("#person_create_modal").modal("hide");
		Router.go('fullperson.view',{"_id": fullperson_id});
		return false;	
	},
	"click .submit": function(event) {
		$("form#person_form").submit();
	},
	"click .cancel": function(event) {
		$('#person_create_modal').on('hidden.bs.modal', function (e) {
			Blaze.remove(modal);
		}).modal("hide");		
		Router.go(Session.get('onCancel'));
	}
});

Template.person_create_modal.rendered=function() {
	$("#person_create_modal").modal("show");
};