/* 
El ciclo de vida de una Session: 
- comienza con el login del usuario. En ese momento se crea con currentSession=new Session(); currentSession.save(); Esto genera un status de 'created'
- a continuaci�n el usuario selecciona la tienda desde la que trabaja, hace el conteo inicial y hace click en esta misma pantalla en 'Verificar' => eso lanza la simulaci�n currentSession.verifyInit() que comprueba con el conteo final de la �ltima sesi�n de la tienda. 
- si la verificaci�n es correcta (o aunque no lo sea si el usuario est� seguro de haber hecho bien el conteo) hace click en 'Iniciar Sesion' => ah� se hace el currentSession.init(store,init_cashcheck) que inicializa estos valores y tambi�n el fecha de init y se cambia el status a 'open' y se inicializa la init_verification
- a partir de ese momento el usuario puede introducir operaciones
- por ultimo el usuario hace click en 'Terminar sesi�n' => le saldr� la pantalla de conteo final
- una vez hecho este conteo final har� click en 'Verificar' y esto lanzar� una simulaci�n de la verificaci�n  currentSession.verifyEnd(end_cashcheck)
- si la verificaci�n ha tenido �xito (o aunque no haya tenido �xito si est� segura del conteo) har� click en 'Terminar Sesion' y se invocar� a currentSession.end(end_cashcheck) que actualizar� este valor as� como la fecha de end, el status='closed' y el end_verification. El hecho de terminar la sesi�n implicar� autom�ticamente el logout del usuario

*/

SessionPOS=Astro.Class({
	name: 'SessionPOS',
	collection: Sessions,
	fields: {
		storeId: {
			type: 'object',
			validators: [
				Validators.required(),
			]		
		},
		userId: {
			type: 'object',
			validators: [
				Validators.required(),
			]		
		},
		type: {
			type: 'string',
			validators: [
				Validators.required(),
			]		
		},
		status: {
			type: 'string',
			default: 'created',
			validators: [
				Validators.required(),
			]		
		},
		init: {
			type: 'date',
			validators: [
				Validators.required(),
			]		
		},
		end: {
			type: 'date',
			validators: [
				Validators.required(),
			]		
		},
		init_cashcheck: {
			type: 'object',
			validators: [
				Validators.required(),
			]		
		},
		end_cashcheck: {
			type: 'object',
			validators: [
				Validators.required(),
			]		
		},
		init_verification: {
			type: 'string',
			validators: [
				Validators.required(),
			]		
		},
		end_verification: {
			type: 'string',
			validators: [
				Validators.required(),
			]		
		},
		ip: {
			type: 'string',
			validators: [
				Validators.required(),
			]		
		},
		comment: {
			type: 'string',
			validators: [
				Validators.required(),
			]		
		},
		createdAt: {
			type: 'date',
			validators: [
				Validators.required(),
			]		
		},
		udpatedAt: {
			type: 'date',
			validators: [
				Validators.required(),
			]		
		},
		createdBy: {
			type: 'string',
			validators: [
				Validators.required(),
			]		
		},
		updatedBy: {
			type: 'string',
			validators: [
				Validators.required(),
			]		
		},
	},
	methods: {
		verifyInit: function(init_cashcheck,callback) {
			Meteor.call('sessionVerifyInit',this._id,init_cashcheck,function(error, result){
				// TODO: ver qu� hacemos en caso de error!
				if(callback!=undefined) {
					callback();		
				}		
			});	
		},
		verifyEnd: function(end_cashcheck,callback) {
			Meteor.call('sessionVerifyEnd',this._id,end_cashcheck,function(error, result){
				// TODO: ver qu� hacemos en caso de error!
				if(callback!=undefined) {
					callback();		
				}		
			});	
		},
		initSession: function(init_cashcheck,callback) {
			if(init_cashcheck==undefined) {
				throw new Meteor.Error("session-init_cashcheck-undefined","Session init failed because no initial cashcheck was provided");
			}
			
			Meteor.call('sessionInit',this._id,init_cashcheck,function(error, result){
				// TODO: ver qu� hacemos en caso de error!
				if(callback!=undefined) {
					callback();		
				}		
			});	
		},
		endSession: function(end_cashcheck,callback) {
			if(end_cashcheck==undefined) {
				throw new Meteor.Error("session-end_cashcheck-undefined","Session end failed because no end cashcheck was provided");
			}
			
			Meteor.call('sessionEnd',this._id,end_cashcheck,function(error, result){
				// TODO: ver qu� hacemos en caso de error!
				if(callback!=undefined) {
					callback();		
				}		
			});	
		},
		last: function(storeId) {   // Metodo est�tico (simplemente no ponemos prototype en la definici�n )
			if(storeId==undefined) {
				throw new Meteor.Error("session_last-storeId-undefined","Session.last() failed because no storeId was provided");
			}
			
			var last_session=Sessions.findOne({ "storeId": storeId },{ sort: {"init": "desc"}});
			
			return last_session;
		},
		operations: function() {    // Implementar como relaci�n??!!!!
			// Ver c�mo har�amos para devolver todas las operaciones asociadas a la sesi�n ordenadas temporalmente y c�mo puede saber la template que las pinte de qu� tipo de operaci�n es cada registro (para pintar unos datos u otros en funci�n de si es un order, una entrada de dinero, etc)
			return; 
		},
		trxs: function() { // Implementar como relaci�n??!!!!
			// Ver c�mo har�amos para devolver todas las trx asociadas a la sesi�n ordenadas temporalmente y c�mo puede saber la template que las pinte de qu� tipo de trx es cada registro (para pintar unos datos u otros en funci�n de si es un efectivo, una operaci�n con tarjeta, etc)   --> hay que tener en cuanta que las entradas y salidas de dinero tambi�n deber�an estar asociadas a una trx
			return; 
		},
	}
});

