Router.route('/admin/session/create',function () {
	//this.layout('layout_admin');
	modal=Blaze.renderWithData(Template.session_form,new Address(),document.getElementById("modal"));
	
/*     this.render('session_form',{
		to: 'modal',
		data: new Address()
	});   */
},{
	name: 'session_form'
});

Router.route('/admin/session/update/:_id',function () {
	var session=Sessions.findOne({_id: this.params._id});   
	this.layout('layout_admin');
    this.render('session_form',{
		to: 'modal',
		data: session
	});
},{
	name: 'session_update'
});

Router.route('/admin/session/view/:_id',function () {
	var session=Sessions.findOne({_id: this.params._id});
	this.layout('layout_admin');
    this.render('session_view',{data: session});
},{
	name: 'session_view'
});

Router.route('/admin/session/remove/:_id',function () {
	var session=Sessions.findOne({_id: this.params._id});

},{
	name: 'session_remove'
});


Router.route('/admin/session/select',function () {  // BORRAR????
    this.render('session_selector');
},{
	name: 'session_select'
});

Router.route('/admin/session/list',function () {
    this.render('session_list');
},{
	name: 'session_list'
});


