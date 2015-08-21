Navigation=Astro.Class({
	name: 'Navigation',
	fields: {
		history: {
			type: 'array',	
			default: []
		}
	},
	methods: {
		push: function(route) {	console.log('pushing!  '+route)
		console.trace();
			this.history.push(route);
		},
		last: function() {
			var last=this.history[this.history.length-2];
			return (last!=undefined)?last:'/';
		},
		display: function() {
			var res='\n';
			_.each(this.history,function(element,index) {
				res+=element+'\n';
			});
			return res;
		}
	},
});



