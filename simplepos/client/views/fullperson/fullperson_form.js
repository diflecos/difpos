AutoForm.addHooks('FullPersonsForm',{
	onSuccess: function() {
		Router.go('/fullperson/'+this.docId);
	}
});

Template.fullperson_form.helpers({
	type: function() {
		return this.mode;
	},
	doc: function() {
		return this.doc;
	},
	selected: function(contextValue, optionValue) {
		return contextValue == optionValue ? 'selected' : '';
	},
	gender_options: function() {
		return OPTIONS.GENDER;
	},
	civil_status_options: function() {
		return OPTIONS.CIVIL_STATUS;
	}
});


Template.fullperson_form.events({
	"click .cancel": function(event) {
		$('#person_create_modal').on('hidden.bs.modal', function (e) {
			Blaze.remove(modal);
		}).modal("hide");		
		Router.go(Session.get('onCancel'));
	}	
});

Template.fullperson_form.rendered=function() {
	AutoForm.resetForm("FullPersonsForm");
};