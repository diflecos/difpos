Router.route('/admin/currency/create',function () {
	//this.layout('layout_admin');
/* 	modal=Blaze.renderWithData(Template.currency_form,new currency(),document.getElementById("modal"));
 */	
    this.render('currency_form',{
		to: 'modal',
		data: new Currency()
	});  
},{
	name: 'currency_form'
});

Router.route('/admin/currency/update/:_id',function () {
	var currency=Currencies.findOne({_id: this.params._id});   
	this.layout('layout_admin');
    this.render('currency_form',{
		to: 'modal',
		data: currency
	});
},{
	name: 'currency_update'
});

Router.route('/admin/currency/view/:_id',function () {
	var currency=Currencies.findOne({_id: this.params._id});
	this.layout('layout_admin');
    this.render('currency_view',{data: currency});
},{
	name: 'currency_view'
});

Router.route('/admin/currency/remove/:_id',function () {
	var currency=Currencies.findOne({_id: this.params._id});

},{
	name: 'currency_remove'
});

Router.route('/admin/currency/select',function () {
    this.render('currency_selector');
},{
	name: 'currency_select'
});



