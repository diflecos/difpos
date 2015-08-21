/*******************  INSTALL **************************/
Router.route('/admin/install', function() {
	navigation.push('/admin/phone/form/'+this.params._id);
	
	this.layout('layout_admin');
	this.render('install');
},{
	name: 'install'
});
	
	