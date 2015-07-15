Template.order_search.events({
	
	"change #order_id": function() {
		console.log("change");
		var orderId=$("#order_id").val();
		if(orderId.length==19) {
			console.log("buscar!");
		}
	}
});