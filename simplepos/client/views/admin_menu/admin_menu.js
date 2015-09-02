Template.admin_menu.rendered=function() {
	$('.menu_items').hide();
	
	$('#sidebar a.menu_title').click(function(event) {
		$(event.target).next().toggle();
	});
	

}

