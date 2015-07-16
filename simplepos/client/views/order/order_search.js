Template.order_search.events({
	
	"change #order_id": function() {
		var orderId=$("#order_id").val();
		if(orderId.length==19) {
			Meteor.call('viewOrder', currentOrder, function(error, result){
				// TODO: ver qué hacemos en caso de error!
				var orderId = result;
				Router.go("/order/view/"+orderId);
			});		
		}
	}, 
	"click #btn_search_order": function(event) {
		event.preventDefault();
		var orderId=$("#order_id").val();
		Meteor.call('checkOrderId', orderId, function(error, result){
			// TODO: ver qué hacemos en caso de error!
			if(result==true) {
				Router.go("/order/view/"+orderId);			
			}
		});		
	}
});