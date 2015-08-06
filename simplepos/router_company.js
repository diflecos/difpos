Router.route('/admin/company/create',function () {
	//this.layout('layout_admin');
/* 	modal=Blaze.renderWithData(Template.company_form,new company(),document.getElementById("modal"));
 */	
    this.render('company_form',{ data: new Company() });  
},{
	name: 'company_form'
});

Router.route('/admin/company/update/:_id',function () {
	var company=Companies.findOne({_id: this.params._id});   
	this.layout('layout_admin');
    this.render('company_form',{
		data: company
	});
},{
	name: 'company_update'
});

Router.route('/admin/company/view/:_id',function () {
	var company=Companies.findOne({_id: this.params._id});
	this.layout('layout_admin');
    this.render('company_view',{data: company});
},{
	name: 'company_view'
});

Router.route('/admin/company/remove/:_id',function () {
	var company=Companies.findOne({_id: this.params._id});

},{
	name: 'company_remove'
});

Router.route('/admin/company/select',function () {
    this.render('company_selector');
},{
	name: 'company_select'
});



