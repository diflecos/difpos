Router.route('/admin/brand/form/:_id',function () {    console.log('routing to: /admin/brand/form/'+this.params._id)
	navigation.push('/admin/brand/form/'+this.params._id);

	var brand;
	if(this.params._id=='create') {
		brand=new Brand({});
	} else {
		brand=Brands.findOne({_id: this.params._id});
	}
  
	this.layout('layout_admin');
    this.render('brand_form',{
		data: brand
	});
},{
	name: 'brand_form'
});

Router.route('/admin/brand/view/:_id',function () {
	navigation.push('/admin/brand/view/'+this.params._id);
	
	var brand=Brands.findOne({_id: this.params._id});  
	this.layout('layout_admin');
	brand.embed=true;
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
	var renderresult=this.render('brand_select',{
		to: 'modal'
	});	
	
	if($("#brand_selector")!=[])
		$("#brand_select").modal('show');
},{
	name: 'brand_select'
});


