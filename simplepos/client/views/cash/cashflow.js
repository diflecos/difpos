Template.cashflow.rendered=function() {
	$("#modalCashFlow").modal("show");	
}

Template.cashflow.helpers({
	isFlowTypeIn: function() {
		return this.flow_type=="in";  console.log(this);
	},
	isFlowTypeOut: function() {
		return this.flow_type=="out";	
	},
	cashFlowOptions: function() {
		if(this.flow_type=="in")
			return OPTIONS.CASHFLOW_IN_CONCEPTS;
		if(this.flow_type=="out")
			return OPTIONS.CASHFLOW_OUT_CONCEPTS;		
	}
});

Template.cashflow.events({
	"click #save_cashflow": function(event) {
		event.preventDefault();
		
		var flow_type=this.flow_type;
		var amount=$("#cashflow_amount").val();
		var concept=$("#cashflow_concept").val();
		var comment=$("#cashflow_comment").val();
		var currentCashFlow=new CashFlow(flow_type,amount,concept,comment);  console.log(currentCashFlow);
		currentCashFlow.save(function() {
			$("#modalCashFlow").on('hidden.bs.modal', function (e) {
				Router.go("/welcome");
			}).modal("hide");
			FlashMessages.sendSuccess('New cash flow recorded with id '+this.cashFlowId);				
		});
	}
});