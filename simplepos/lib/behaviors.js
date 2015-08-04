Astro.createBehavior({
	name: 'audit_trail',
	events: {
		addbehavior: function(behaviorData) {
			var Class = this;

			// Add fields to the Class.
			Class.addFields({
				createdAt: {
					type: 'date',
					default: null
				},
				updatedAt: {
					type: 'date',
					default: null
				},
				createdBy: {
					type: 'string',
					default: null
				},
				updatedBy: {
					type: 'string',
					default: null
				}
			});

			// Update the "createdAt" and "updatedAt" fields in proper events.
			Class.addEvents({
				beforeInsert: function() {
					this.createdAt = new Date();
					this.createdBy=Meteor.user()._id;
					this.updatedAt = new Date();
					this.updatedBy=Meteor.user()._id;
				},
				beforeUpdate: function() {
					this.updatedAt = new Date();
					this.updatedBy=Meteor.user()._id;
				}
			});
		},
		initclass: function(schemaDefinition) {},
		initinstance: function(attrs) {}
	}
});