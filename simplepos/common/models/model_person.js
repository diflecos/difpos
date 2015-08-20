Person=Astro.Class({
	name: 'Person',
	collection: Persons,
	fields: {
		name: {
			type: 'string',
			default: '',		
		},
		family_name: {
			type: 'string',	
		},
		nick: {
			type: 'string',	
		},	
		id_nbr: {
			type: 'string',
		},
		birthdate: {
			type: 'date',
		},
		gender: {
			type: 'string',
		},
		civil_status: {
			type: 'string',
		}
	},
	behaviors: ['audit_trail'],	
	methods: {
		display: function() {
			return this.name+' '+this.family_name.toUpperCase();
		},
		displayLong: function() {
			return this.name+' '+this.family_name.toUpperCase()+' ('+this.gender+', '+this.age()+', '+this.civil_status+')';
		},
		age: function() {
			return ', '+moment().diff(this.birthdate, 'years')+' years old';
		}
	},
	validators: {
		name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3, 'At least 3 character!'),
			Validators.maxLength(20,'At most 20 characters!'),
		],
		family_name: [
			Validators.required(),
			Validators.string(),
			Validators.minLength(3,'At least 3 characters!'),
			Validators.maxLength(100,'At most 100 characters!'),
		],
		nick: [
			Validators.string(),
			Validators.maxLength(20,'At most 20 characters!'),
		],
		id_nbr: [
			Validators.string(),
			Validators.minLength(3,'At least 3 characters!'),
			Validators.maxLength(20,'At most 20 characters!'),
		],
		birthdate: [
			Validators.date(),
		],
		gender: [
			Validators.required(),
			Validators.choice(VALUES.GENDER),
			default: 'Male',
		],
		civil_status: [
			Validators.required(),
			Validators.choice(VALUES.CIVIL_STATUS),
			default: 'Single',
		],
	}
});

