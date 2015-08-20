Router.route('/admin/social/form/:_id',function () { 
	navigation.push('/admin/social/form/'+this.params._id);

	var social;
	if(this.params._id=='create') {
		social=new Social({});
	} else {
		social=Socials.findOne({_id: this.params._id});
		social.validate();  // esto es necesario para forzar que la variable esté asociada con el modelo y que no salte excepción
	}
  
	this.layout('layout_admin');
    this.render('social_form',{
		to: 'modal',
		data: social
	});

	if($("#social_form")!=[])
		$("#social_form").modal('show');	
},{
	name: 'social_form'
});

Router.route('/admin/social/view/:_id',function () {
	navigation.push('/admin/social/view/'+this.params._id);
	
	var social=Socials.findOne({_id: this.params._id});  
	this.layout('layout_admin');
	social.embed=true;
    this.render('social_view',{data: social});
},{
	name: 'social_view'
});

Router.route('/admin/social/remove/:_id',function () {
	var social=Socials.findOne({_id: this.params._id});

},{
	name: 'social_remove'
});


Router.route('/admin/social/select',function () {
	navigation.push('/admin/social/select');
	
	this.layout('layout_admin');
	var renderresult=this.render('social_select',{
		to: 'modal'
	});	
	
	if($("#social_select")!=[])
		$("#social_select").modal('show');
},{
	name: 'social_select'
});


