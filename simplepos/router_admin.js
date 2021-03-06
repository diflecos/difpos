Router.route('/admin',function () {
	navigation.push('/admin');
	
	this.layout('layout_admin');
    this.render('welcome_admin');
},{
	name: 'admin'
});

Router.route('/admin/welcome',function () {
	navigation.push('/admin/welcome');

	this.layout('layout_admin');
    this.render('welcome_admin');
},{
	name: 'admin_welcome'
});


Router.route('/admin/address/create',function () {
	//this.layout('layout_admin');
	modal=Blaze.renderWithData(Template.address_form,new Address(),document.getElementById('modal'));
	
/*     this.render('address_form',{
		to: 'modal',
		data: new Address()
	});   */
},{
	name: 'address_form'
});

Router.route('/admin/address/update/:_id',function () {
	var address=Addresses.findOne({_id: this.params._id});   
	this.layout('layout_admin');
    this.render('address_form',{
		to: 'modal',
		data: address
	});
},{
	name: 'address_update'
});

Router.route('/admin/address/view/:_id',function () {
	var address=Addresses.findOne({_id: this.params._id});
	this.layout('layout_admin');
    this.render('address_view',{data: address});
},{
	name: 'address_view'
});

Router.route('/admin/address/remove/:_id',function () {
	var address=Addresses.findOne({_id: this.params._id});

},{
	name: 'address_remove'
});




