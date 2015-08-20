Template.person_view.helpers({
	birthdate_formatted: function() {
		return moment(this.birthdate).format(PARAMS.DATE_FORMAT);
	},
	age: function() {
		return ', '+moment().diff(this.birthdate, 'years')+' years old';
	}
});

Template.person_view.events({
	'click #btn_update': function() {
		if($('#person_create_modal').length>0) {
			Template.person_create_modal.rendered();
		} else {
			Blaze.renderWithData(Template.person_create_modal,{mode: 'update'},document.body);
		}
	}
});