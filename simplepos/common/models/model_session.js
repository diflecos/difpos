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
				// TODO: ver qué hacemos en caso de error!
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
				// TODO: ver qué hacemos en caso de error!
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
				// TODO: ver qué hacemos en caso de error!
				if(callback!=undefined) {
					callback();		
				}		
			});	
		},
		last: function(storeId) {   // Metodo estático (simplemente no ponemos prototype en la definición )
			if(storeId==undefined) {
				throw new Meteor.Error('session_last-storeId-undefined','Session.last() failed because no storeId was provided');
			}
			
			var last_session=Sessions.findOne({ 'storeId': storeId },{ sort: {'init': 'desc'}});
			
			return last_session;
		},
		operations: function() {    // Implementar como relación??!!!!
			// Ver cómo haríamos para devolver todas las operaciones asociadas a la sesión ordenadas temporalmente y cómo puede saber la template que las pinte de qué tipo de operación es cada registro (para pintar unos datos u otros en función de si es un order, una entrada de dinero, etc)
			return []; 
		},
		trxs: function() { // Implementar como relación??!!!!
			// Ver cómo haríamos para devolver todas las trx asociadas a la sesión ordenadas temporalmente y cómo puede saber la template que las pinte de qué tipo de trx es cada registro (para pintar unos datos u otros en función de si es un efectivo, una operación con tarjeta, etc)   --> hay que tener en cuanta que las entradas y salidas de dinero también deberían estar asociadas a una trx
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

