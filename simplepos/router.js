modal={};   // variable global que se usa para guardar la view generada por Blaze.render de cada modal que mostramos para poder luego hacer el Blaze.remove(modal) correspondiente

Router.configure({
	layoutTemplate: 'layout1',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'	
});

Router.route('/',function () {
    this.render('login');
});

Router.route('/welcome',function () {
    this.render('welcome');
});

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
	var order;
	Meteor.call('viewOrder', orderId, function(error, result){
		// TODO: ver qué hacemos en caso de error!
		order = result;
		if(order==undefined) {
			FlashMessages.sendError('no order was found with id '+orderId);
			Router.go(Session.get('onCancel'));	
		} else {
			currentOrder=order;
			Session.set("currentOrder",order);
		}				
	});			
	this.render("order_view");
},{
	name: 'order_view'
});
		
Router.route('/order/print/:_id', function() {
	var orderId=this.params._id;
	var query = this.params.query;
	
	// We determine whether the URL contains "?gift=true"
	var gift=false;
	if(query==undefined || query=="") {
		gift=false;
	} else if(query.gift=="true") {
		gift=true;
	}
	
	self=this;
	// We retrieve the concerned order based on id
	var order;
	Meteor.call('viewOrder', orderId, function(error, result){
		// TODO: ver qué hacemos en caso de error!
		order = result;
		if(order==undefined) {
			FlashMessages.sendError('no order was found with id '+orderId);
		} else {
			order.isGiftInvoice=gift;
			self.render('invoice',{ 
				data: order
			});
		}				
	});			
},{
	name: 'order_print'
});
		
Router.route('/order/search', function() {
	this.render('order_search');
},{
	name: 'order_search'
});		
	
Router.route('/cash/check', function() {
	this.render('cash_check');
},{
	name: 'cash_check'
});		

Router.route('/cash/inout', function() {
	this.render('cash_inout');
},{
	name: 'cash_inout'
});		


/*******************  INSTALL **************************/
Router.route('/install', function() {
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