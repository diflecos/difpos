Navigation=Astro.Class({
	name: 'Navigation',
	fields: {
		history: {
			type: 'array',	
			default: []
		}
	},
	methods: {
		push: function(route) {	
			this.history.push(route);
		},
		last: function() {
			return this.history[this.history.length-2];
		}
	},
});



