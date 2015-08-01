/* 
El ciclo de vida de una Session: 
- comienza con el login del usuario. En ese momento se crea con currentSession=new Session(); currentSession.save(); Esto genera un status de 'created'
- a continuación el usuario selecciona la tienda desde la que trabaja, hace el conteo inicial y hace click en esta misma pantalla en 'Verificar' => eso lanza la simulación currentSession.verifyInit() que comprueba con el conteo final de la última sesión de la tienda. 
- si la verificación es correcta (o aunque no lo sea si el usuario está seguro de haber hecho bien el conteo) hace click en 'Iniciar Sesion' => ahí se hace el currentSession.init(store,init_cashcheck) que inicializa estos valores y también el fecha de init y se cambia el status a 'open' y se inicializa la init_verification
- a partir de ese momento el usuario puede introducir operaciones
- por ultimo el usuario hace click en 'Terminar sesión' => le saldrá la pantalla de conteo final
- una vez hecho este conteo final hará click en 'Verificar' y esto lanzará una simulación de la verificación  currentSession.verifyEnd(end_cashcheck)
- si la verificación ha tenido éxito (o aunque no haya tenido éxito si está segura del conteo) hará click en 'Terminar Sesion' y se invocará a currentSession.end(end_cashcheck) que actualizará este valor así como la fecha de end, el status='closed' y el end_verification. El hecho de terminar la sesión implicará automáticamente el logout del usuario

*/

SessionPOS=function SessionPOS() {  
	this.store=undefined;
	this.user=Meteor.user();
	this.type="";   //   ENUM('admin','audit','ecommerce','pos')
	this.status='created'; //   ENUM('open','closed','zombie')
	this.init=undefined;
	this.end=undefined;
	this.init_cashcheck=undefined;
	this.end_cashcheck=undefined;
	this.init_verification=undefined;
	this.end_verification=undefined;
	this.ip=undefined;
	this.comment;
	this.createdAt;
	this.udpatedAt;
	this.createdBy;
	this.updatedBy;
		
	this.save();
}

SessionPOS.prototype.find=function(id) {
	if(id!=undefined) {  
		var session=Sessions.findOne(id);
		this._id=session._id;		
		this.store=Stores.findOne(session.storeId);
		this.user=Meteor.users.findOne(session.userId);
		this.type=session.type;   //   ENUM('admin','audit','ecommerce','pos')
		this.status=session.status; //   ENUM('created','open','closed','zombie')
		this.init=session.init;
		this.end=session.end;
		this.init_cashcheck=session.init_cashcheck;
		this.end_cashcheck=session.end_cashcheck;
		this.init_verification=session.init_verification;
		this.end_verification=session.end_verification;
		this.ip=session.ip;
		this.comment=session.comment;
		this.createdAt=session.createdAt;
		this.udpatedAt=session.udpatedAt;
		this.createdBy=session.createdBy;
		this.updatedBy=session.updatedBy;
	} else {
		throw new Meteor.Error("SessionIdUndefined","Impossible to find a Session with undefined id"); 
	}
}

SessionPOS.prototype.save=function(callback) {
	self=this;
	Meteor.call('sessionSave',this,function(error, result){
		// TODO: ver qué hacemos en caso de error! 
		console.log(error);
	
		if(result.insertedId!=undefined) {
			self._id=result.insertedId;
		}

		if(callback!=undefined) {
			callback();		
		}
	});		
}

SessionPOS.prototype.remove=function(id,callback) {
	Meteor.call('sessionRemove',id,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		callback();
	});		
}

SessionPOS.prototype.setStore=function(store) {
	if(store==undefined) {
		throw new Meteor.Error("store-undefined","Store undefined");
	}
	
	this.store=store;
	Meteor.call('sessionSave',this,function(error, result){
		// TODO: ver qué hacemos en caso de error! 
		console.log(error);
	});			
}

SessionPOS.prototype.setType=function(type) {
	if(type==undefined) {
		throw new Meteor.Error("session-type-undefined","Session type undefined");
	}
	
	this.type=type;
	Meteor.call('sessionSave',this,function(error, result){
		// TODO: ver qué hacemos en caso de error! 
		console.log(error);
	});			
}

SessionPOS.prototype.verifyInit=function(init_cashcheck,callback) {
	Meteor.call('sessionVerifyInit',this._id,init_cashcheck,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		if(callback!=undefined) {
			callback();		
		}		
	});	
}

SessionPOS.prototype.verifyEnd=function(end_cashcheck,callback) {
	Meteor.call('sessionVerifyEnd',this._id,end_cashcheck,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		if(callback!=undefined) {
			callback();		
		}		
	});	
}

SessionPOS.prototype.initSession=function(init_cashcheck,callback) {
	if(init_cashcheck==undefined) {
		throw new Meteor.Error("session-init_cashcheck-undefined","Session init failed because no initial cashcheck was provided");
	}
	
	Meteor.call('sessionInit',this._id,init_cashcheck,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		if(callback!=undefined) {
			callback();		
		}		
	});	
}

SessionPOS.prototype.endSession=function(end_cashcheck,callback) {
	if(end_cashcheck==undefined) {
		throw new Meteor.Error("session-end_cashcheck-undefined","Session end failed because no end cashcheck was provided");
	}
	
	Meteor.call('sessionEnd',this._id,end_cashcheck,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		if(callback!=undefined) {
			callback();		
		}		
	});	
}

SessionPOS.prototype.operations=function() {
	// Ver cómo haríamos para devolver todas las operaciones asociadas a la sesión ordenadas temporalmente y cómo puede saber la template que las pinte de qué tipo de operación es cada registro (para pintar unos datos u otros en función de si es un order, una entrada de dinero, etc)
	return; 
}

SessionPOS.prototype.trxs=function() {
	// Ver cómo haríamos para devolver todas las trx asociadas a la sesión ordenadas temporalmente y cómo puede saber la template que las pinte de qué tipo de trx es cada registro (para pintar unos datos u otros en función de si es un efectivo, una operación con tarjeta, etc)   --> hay que tener en cuanta que las entradas y salidas de dinero también deberían estar asociadas a una trx
	return; 
}
