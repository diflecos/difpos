modal={};   // variable global que se usa para guardar la view generada por Blaze.render de cada modal que mostramos para poder luego hacer el Blaze.remove(modal) correspondiente
messagebox={}; // idem para la caja de mensaje

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

Router.route('/fullperson/:_id', function() {
	var fullperson=FullPersons.findOne({_id: this.params._id});
	if(fullperson==undefined) {
		messagebox={
			'message': 'no person was found with id '+this.params._id,
			'message_type': 'warning'
		};
		Session.set('messagebox',messagebox);	
		Router.go(Session.get('onCancel'));
	} else {
		this.render('fullperson_view', {data: fullperson});
	}
},{
	name: 'fullperson.view'
});

Router.route('/person/create', function() {
	modal=Blaze.renderWithData(Template.person_form,{'mode': 'create'},document.body);
},{
	name: 'person.create'
});

Router.route('/person/update/:_id', function() {
	var fullperson=FullPersons.findOne({_id: this.params._id});
	if(fullperson==undefined) {
		messagebox={
			'message': 'no person was found with id '+this.params._id,
			'message_type': 'warning'
		};
		Session.set('messagebox',messagebox);	
		Router.go(Session.get('onCancel'));
	} else {
		modal=Blaze.renderWithData(Template.person_form,{'mode': 'update', 'person': fullperson.person},document.body);
	}
},{
	name: 'person.update'
});

Router.route('/person/delete/:_id', function() {
	var fullperson=FullPersons.findOne({_id: this.params._id});
	if(fullperson==undefined) {
		messagebox={
			'message': 'no person was found with id '+this.params._id,
			'message_type': 'warning'
		};
		Session.set('messagebox',messagebox);	
		Router.go(Session.get('onCancel'));
	} else {
		FullPersons.remove(this.params._id);
	}
},{
	name: 'person.delete'
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