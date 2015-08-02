Meteor.methods({
	sessionSave: function (session) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		storeId=(session.store!=undefined)?session.store._id:undefined;   
		userId=(session.user!=undefined)?session.user._id:undefined; 
	
		result=Sessions.upsert(session._id,{
			$set: {
				storeId: storeId,
				userId: userId,
				type: session.type,
				status: session.status, 
				init: session.init,
				end: session.end,
				init_cashcheck: session.init_cashcheck,
				end_cashcheck: session.end_cashcheck,
				init_verification: session.init_verification,
				end_verification: session.end_verification,
				ip: session.ip,
				comment: session.comment,
				udpatedAt: new Date(),
				updatedBy: Meteor.userId(),
			},
			$setOnInsert: {
				createdAt: new Date(),
				createdBy: Meteor.userId(),			
			}
		});

		return result;
	},	
	sessionRemove: function(id) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
		
		Sessions.remove(id);
	},
	sessionOperations: function(id) {    // esta es una operacion de lectura, no tiene porque estar en los methods...
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
	
	},
	sessionVerifyInit: function(id,init_cashcheck) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
		
		var verification="Ok"; // recuperamos la última session de la tienda con sessionLast() y ahí vemos cual fue el end_cashcheck y verificamos contra él
		result=Sessions.update(id,{
			$set: {
				init_cashcheck: init_cashcheck,
				init_verification: verification,
				udpatedAt: new Date(),
				updatedBy: Meteor.userId(),
			}
		});	

		return result;
	},
	sessionVerifyEnd: function(id,end_cashcheck) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }
	
		var verification="Ok"; // recuperamos todas las operaciones de la sesión con sessionOperations() y a partir del init_cashcheck y de estas operaciones hacemos la verificación
		result=Sessions.update(id,{
			$set: {
				end_cashcheck: end_cashcheck,
				end_verification: verification,
				udpatedAt: new Date(),
				updatedBy: Meteor.userId(),
			}
		});	

		return result;		
	},
	sessionInit: function(id) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		result=Sessions.update(id,{
			$set: {
				init: new Date(),
				status: 'open',
				udpatedAt: new Date(),
				updatedBy: Meteor.userId(),
			}
		});	
		
		return sessionId;
	}, 
	sessionEnd: function(id) {
		if (! Meteor.userId()) { throw new Meteor.Error("not-authorized"); }

		result=Sessions.update(id,{
			$set: {
				end: new Date(),
				status: 'closed',
				udpatedAt: new Date(),
				updatedBy: Meteor.userId(),
			}
		});	
		
		return sessionId;
	}, 
});
