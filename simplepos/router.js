modal={};   // variable global que se usa para guardar la view generada por Blaze.render de cada modal que mostramos para poder luego hacer el Blaze.remove(modal) correspondiente

Router.configure({
	layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'	
});

Router.route('/',function () {
    this.render('login');
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