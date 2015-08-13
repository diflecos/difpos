Router.route('/admin/phone/form/:_id',function () { 
	navigation.push('/admin/phone/form/'+this.params._id);

	var phone;
	if(this.params._id=='create') {
		phone=new Phone({});
	} else {
		phone=Phones.findOne({_id: this.params._id});
		phone.validate();  // esto es necesario para forzar que la variable esté asociada con el modelo y que no salte excepción
	}
  
	this.layout('layout_admin');
    this.render('phone_form',{
		to: 'modal',
		data: phone
	});

	if($("#phone_form")!=[])
		$("#phone_form").modal('show');	
},{
	name: 'phone_form'
});

Router.route('/admin/phone/view/:_id',function () {
	navigation.push('/admin/phone/view/'+this.params._id);
	
	var phone=Phones.findOne({_id: this.params._id});  
	this.layout('layout_admin');
	phone.embed=true;
    this.render('phone_view',{data: phone});
},{
	name: 'phone_view'
});

Router.route('/admin/phone/remove/:_id',function () {
	var phone=Phones.findOne({_id: this.params._id});

},{
	name: 'phone_remove'
});


Router.route('/admin/phone/select',function () {
	navigation.push('/admin/phone/select');
	
	this.layout('layout_admin');
	var renderresult=this.render('phone_select',{
		to: 'modal'
	});	
	
	if($("#phone_select")!=[])
		$("#phone_select").modal('show');
},{
	name: 'phone_select'
});


