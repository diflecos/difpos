Router.route('/admin/brand/create',function () {
	this.layout('layout_admin');
	//modal=Blaze.renderWithData(Template.brand_form,new Address(),document.getElementById("modal"));
	
    this.render('brand_form',{
		to: 'modal',
		data: new Brand()
	});  
},{
	name: 'brand_form'
});

Router.route('/admin/brand/update/:_id',function () {
	var brand=Brands.findOne({_id: this.params._id});   
	this.layout('layout_admin');
    this.render('brand_form',{
		to: 'modal',
		data: brand
	});
},{
	name: 'brand_update'
});

Router.route('/admin/brand/view/:_id',function () {
	var brand=Brands.findOne({_id: this.params._id});
	this.layout('layout_admin');
    this.render('brand_view',{data: brand});
},{
	name: 'brand_view'
});

Router.route('/admin/brand/remove/:_id',function () {
	var brand=Brands.findOne({_id: this.params._id});

},{
	name: 'brand_remove'
});


Router.route('/admin/brand/select',function () {
	navigation.push('/admin/brand/select');
	
	this.layout('layout_admin');
	var renderresult=this.render('brand_selector',{
		to: 'modal'
	});	
	
	if($("#brand_selector")!=[])
		$("#brand_selector").modal('show');
},{
	name: 'brand_select'
});


