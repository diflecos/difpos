CashFlow=function CashFlow(flow_type,amount,concept,comment) {
	this.cashFlowId;
	this.flow_type=flow_type; // "In" --> money inputs in the POS, "Out" --> money outputs the POS
	this.amount=amount;
	this.concept=concept;
	this.comment=comment;
}

CashFlow.prototype.save=function(callback) {
	Meteor.call('cashFlowAdd',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		this.cashFlowId=result;
		callback();
	});		
}
