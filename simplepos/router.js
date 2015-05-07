Router.configure({
	layoutTemplate: 'layout',
    loadingTemplate: 'loading',
    notFoundTemplate: 'notFound'	
});

Router.route('/',function () {
    this.render('login');
});

Router.route('/fullperson/:_id', function() {
	console.log(this.params._id);
	var fullperson = FullPersons.findOne({_id: this.params._id});
	console.log(fullperson);
	this.render('fullperson_view', {data: fullperson});
},{
	name: 'fullperson.view'
});


Router.route('/fullpersons', {
	template: 'fullpersons_index'
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