Comment=Astro.Class({
	name: 'Comment',
	fields: {
		date: {
			type: 'date',
		},
		userId: {
			type: 'string',
		},
		text: {
			type: 'string',
			default: '',		
		},
	},
	init: function(attrs) {  // Constructor
		this.set('date',attrs.date);
		this.set('userId',attrs.userId);
		this.set('text',attrs.text);
	},	
	methods: {
		user: function() {
			return Meteor.users.findOne(this.userId);
		},
		display: function() {
			return moment(this.date).format(PARAMS.DATETIME_FORMAT)+', '+this.user().username+': '+this.text;
		}
	},
	validators: {
		date: [
			Validators.required(),
			Validators.date(),
		],
		userId: [
			Validators.required(),
			Validators.string(),
		],
		text: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(5, 'At least 5 character!'),
			Validators.maxLength(1000, 'At most 1000 character!'),
		],
	}
});



