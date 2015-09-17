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
		},
		userId: {
			type: 'object',	
		},
		type: {
			type: 'string',		
		},
		status: {
			type: 'string',
			default: 'created',		
		},
		init: {
			type: 'date',		
		},
		end: {
			type: 'date',	
		},
		init_cashcheck: {
			type: 'object',	
		},
		end_cashcheck: {
			type: 'object',	
		},
		init_verification: {
			type: 'string',		
		},
		end_verification: {
			type: 'string',	
		},
		ip: {
			type: 'string',		
		},
		comments: {
			type: 'array',	
		},
	},
	init: function (attrs) {  // Constructor
		this.set('storeId',attrs.storeId);
		this.set('userId',attrs.userId);
		this.set('type',attrs.type);
		this.set('status',attrs.status);
		this.set('init',attrs.init);
		this.set('end',attrs.end);
		this.set('init_cashcheck',attrs.init_cashcheck);
		this.set('end_cashcheck',attrs.end_cashcheck);
		this.set('init_verification',attrs.init_verification);
		this.set('end_verification',attrs.end_verification);
		this.set('ip',attrs.ip);
		this.set('comments',attrs.comments);
		
	},		
	behaviors: ['audit_trail'],	
	methods: {
		addComment: function(comment) {
			this.comments.push(comment);
		},	
		verifyInit: function(init_cashcheck,callback) {
			Meteor.call('sessionVerifyInit',this._id,init_cashcheck,function(error, result){
				// TODO: ver qu� hacemos en caso de error!
				if(callback!=undefined) {
					callback();		
				}		
			});	
		},
		result_at: function() {
			var result=0;
			if(this.operations()!=undefined && this.operations.length>0) {
				this.operations().forEach(function(op) {
					result+=op.amount_at();
				});				
			}
			return result;
		},
		mismatch: function() {
			return this.end_cashcheck.count()-this.result_at()-this.init_cashcheck.count();
		},
		verifyEnd: function() {
			return (this.mismatch()==0);
		},
		initSession: function(init_cashcheck,callback) {
			if(init_cashcheck==undefined) {
				throw new Meteor.Error('session-init_cashcheck-undefined','Session init failed because no initial cashcheck was provided');
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
				throw new Meteor.Error('session-end_cashcheck-undefined','Session end failed because no end cashcheck was provided');
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
				throw new Meteor.Error('session_last-storeId-undefined','Session.last() failed because no storeId was provided');
			}
			
			var last_session=Sessions.findOne({ 'storeId': storeId },{ sort: {'init': 'desc'}});
			
			return last_session;
		},
		operations: function() {    // Implementar como relaci�n??!!!!
			// Ver c�mo har�amos para devolver todas las operaciones asociadas a la sesi�n ordenadas temporalmente y c�mo puede saber la template que las pinte de qu� tipo de operaci�n es cada registro (para pintar unos datos u otros en funci�n de si es un order, una entrada de dinero, etc)
			return []; 
		},
		trxs: function() { // Implementar como relaci�n??!!!!
			// Ver c�mo har�amos para devolver todas las trx asociadas a la sesi�n ordenadas temporalmente y c�mo puede saber la template que las pinte de qu� tipo de trx es cada registro (para pintar unos datos u otros en funci�n de si es un efectivo, una operaci�n con tarjeta, etc)   --> hay que tener en cuanta que las entradas y salidas de dinero tambi�n deber�an estar asociadas a una trx
			return; 
		}
	},
	validators: {
		storeId: Validators.required(),
		userId: Validators.required(),
		type: Validators.required(),
		status: Validators.required(),
		init: Validators.required(),
		end: Validators.required(),
		init_cashcheck: Validators.required(),
		end_cashcheck: Validators.required(),
		init_verification: Validators.required(),
		end_verification: Validators.required(),
	}	
});

