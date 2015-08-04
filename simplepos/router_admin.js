Router.route('/admin',function () {
	this.layout('layout_admin');
    this.render('admin');
},{
	name: 'admin'
});



Router.route('/admin/brand/create',function () {
	this.layout('layout_admin');
    this.render('brand_create');
},{
	name: 'brand_create'
});


Router.route('/admin/address/create',function () {
	this.layout('layout_admin');
    this.render('address_form',{data: new Address()});
},{
	name: 'address_form'
});

Router.route('/admin/address/update/:_id',function () {
	var address=Addresses.findOne({_id: this.params._id});   
	this.layout('layout_admin');
    this.render('address_form',{data: address});
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
