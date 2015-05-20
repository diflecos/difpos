Template.person_form.helpers({
	mode_create: function() {
		return this.mode=='create';
	},
	selected: function(contextValue, optionValue) {
		return contextValue == optionValue ? 'selected' : '';
	}
});

Template.person_form.events({
	"submit form#person_form": function(event) {
		event.preventDefault();
		if(this.mode=="create") {
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
			fullperson_id=event.target.id.value;
			fullperson=FullPersons.findOne({_id: fullperson_id});
			FullPersons.update(fullperson_id,{$set: {
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
		
		$("#person_create_modal").on('hidden.bs.modal', function (e) {
			Blaze.remove(modal);
		}).modal("hide");
		Router.go('fullperson.view',{"_id": fullperson_id});
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

Template.person_form.rendered=function() {
	$("#person_create_modal").modal("show");
};