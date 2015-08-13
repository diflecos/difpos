Router.route('/admin/email/form/:_id',function () { 
	navigation.push('/admin/email/form/'+this.params._id);

	var email;
	if(this.params._id=='create') {
		email=new Email({});
	} else {
		email=Emails.findOne({_id: this.params._id});
	}
  
	this.layout('layout_admin');
    this.render('email_form',{
		to: 'modal',
		data: email
	});
	
	if($("#email_form")!=[])
		$("#email_form").modal('show');		
},{
	name: 'email_form'
});

Router.route('/admin/email/view/:_id',function () {
	navigation.push('/admin/email/view/'+this.params._id);
	
	var email=Emails.findOne({_id: this.params._id});  
	this.layout('layout_admin');
	email.embed=true;
    this.render('email_view',{data: email});
},{
	name: 'email_view'
});

Router.route('/admin/email/remove/:_id',function () {
	var email=Emails.findOne({_id: this.params._id});

},{
	name: 'email_remove'
});


Router.route('/admin/email/select',function () {
	navigation.push('/admin/email/select');
	
	this.layout('layout_admin');
	var renderresult=this.render('email_select',{
		to: 'modal'
	});	
	
	if($("#email_select")!=[])
		$("#email_select").modal('show');
},{
	name: 'email_select'
});


