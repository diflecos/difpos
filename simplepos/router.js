modal={};   // variable global que se usa para guardar la view generada por Blaze.render de cada modal que mostramos para poder luego hacer el Blaze.remove(modal) correspondiente

Router.configure({
	layoutTemplate: 'layout1',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'	
});

Router.route('/login',function () {
	this.layout('layout0');
    this.render('login');
},{
	name: 'login'
});

Router.route('/welcome',function () {
	this.layout('layout1');
    this.render('welcome');
},{
	name: 'welcome'
});


/*******************  FULLPERSON **************************/
Router.route('/fullpersons', {
	template: 'fullpersons_index'
},{
	name: 'fullpersons.index'
});




Router.route('/fullperson/create', function() {
	this.render('fullperson_form',{ data: {mode: 'insert', doc: null}});
},{
	name: 'fullperson_create'
});

Router.route('/fullperson/update/:_id', function() {
	var fullperson=FullPersons.findOne({_id: this.params._id});
	if(fullperson==undefined) {
		FlashMessages.sendError('no person was found with id '+this.params._id);
		Router.go(Session.get('onCancel'));
	} else {
		this.render('fullperson_form',{ data: {mode: 'update', doc: fullperson}});
	}
},{
	name: 'fullperson.update'
});

Router.route('/fullperson/delete/:_id', function() {
	var fullperson=FullPersons.findOne({_id: this.params._id});
	if(fullperson==undefined) {
		FlashMessages.sendError('no person was found with id '+this.params._id);
		Router.go(Session.get('onCancel'));
	} else {
		FullPersons.remove(this.params._id);
	}
},{
	name: 'fullperson.delete'
});


Router.route('/fullperson/:_id', function() {
	var fullperson=FullPersons.findOne({_id: this.params._id});
	if(fullperson==undefined) {
		FlashMessages.sendError('no person was found with id '+this.params._id);
		Router.go(Session.get('onCancel'));
	} else {
		this.render('fullperson_view', {data: fullperson});
	}
},{
	name: 'fullperson.view'
});

/*******************  ORDERS **************************/
Router.route('/order/create', function() {
	currency=store.currency;
	currentOrder=new Order(currency);
	Session.set('currentOrder',currentOrder);
	this.layout('layout2');
	this.render('order',{to: 'left'});
	this.render('itemlocator',{to: 'right'});
},{
	name: 'order_create'
});

Router.route('/order/payment', function() {
	this.layout('layout2');
	this.render('order',{to: 'left'});
	this.render('payment',{to: 'right'});
},{
	name: 'order_payment'
});
	
Router.route('/order/comments', function() {
	this.layout('layout2');
	this.render('order',{to: 'left'});
	this.render('order_comments',{to: 'right'});
},{
	name: 'order_comments'
});
		
Router.route('/order/view/:_id', function() {
	var orderId=this.params._id;
	
	var order=new Order({});
	order.id=orderId;
	try { 
		order.find();
		currentOrderCurrency=order.currency
		this.render("order_view",{ 
			data: order
		});			
	}
	catch(error) { 
		FlashMessages.sendError('No order was found with id '+orderId+"["+error.reason+"]");
	}	
},{
	name: 'order_view'
});
		
Router.route('/order/print/:_id', function() {
	var orderId=this.params._id;
	
	// We determine whether the URL contains "?isGiftTicket=true"
	var isGiftTicket=false;
	var query = this.params.query;
	if(query==undefined || query=="") {
		isGiftTicket=false;
	} else if(query.isGiftTicket=="true") {
		isGiftTicket=true;
	}
	
	// We retrieve the concerned order based on id
	var order=new Order({});
	order.id=orderId;
	try { 
		order.find();
		currentOrderCurrency=order.currency
		order.isGiftInvoice=isGiftTicket;
		this.render("invoice",{ 
			data: order
		});			
	}
	catch(error) {  
		FlashMessages.sendError('No order was found with id '+orderId+"["+error.reason+"]");
	}		
},{
	name: 'order_print'
});
		
Router.route('/order/search', function() {
	this.render('order_search');
},{
	name: 'order_search'
});		
	
/*******************  CASH **************************/	
Router.route('/cash/check', function() {
	this.render('cash_check');
},{
	name: 'cash_check'
});		

Router.route('/cashflow/:flow_type', function() {
	var flow_type=this.params.flow_type;
	if(flow_type=="in" || flow_type=="out") {
		this.render('cashflow',{
			to: 'modal',
			data: new CashFlow(flow_type,0,"","")
		});	
	}
},{
	name: 'cashflow'
});		


/*******************  SESSION **************************/
Router.route('/session/init', function() {
	Meteor.call('sessionInit',{storeId: "slslslslsllslsls",type: "pos"},function(error, result){
		// TODO: ver qué hacemos en caso de error!
		var sessionId = result;
		FlashMessages.sendSuccess('New session opened with id '+sessionId);	
	});	
	Router.go("/cash/check");
},{
	name: 'session_init'
});

Router.route('/session/end', function() {
	Router.go("/cash/check");
},{
	name: 'session_end'
});	

/*******************  USERS **************************/
Router.route('/user/create', function() {
	this.render('user_create');
},{
	name: 'user_create'
});	


/*******************  INSTALL **************************/
Router.route('/install', function() {
	this.layout('layout0');
	this.render('install');
},{
	name: 'install'
});
	
		
	
	
	
/* 	this.route('cashinout', {
		path: 'cashinout',
    });

	this.route('fullperson', {
		path: 'fullperson/:_id',
		template: 'fullperson',
		data: function() { 
			console.log(FullPersons.findOne(this.params._id));
			return FullPersons.findOne(this.params._id); }
    });

	this.route('fullpersons', {
		path: 'fullpersons',
		data: function() { return FullPersons.find(); }
    });
	
	this.route('clonar', {
		path: 'clonar',
    });

	    this.route('welcome', {
		path: 'welcome',
    });
}); */