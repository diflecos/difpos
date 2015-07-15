Template.order_comments.events({
	"click #add_comments": function(event) {
		event.preventDefault();
		
		currentOrder.public_comment=$("#public_comment").val();
		currentOrder.private_comment=$("#private_comment").val();
		
		Session.set("currentOrder",currentOrder);
//		Blaze.render('order_layout');
		$("#beep")[0].play();	
	}
});
