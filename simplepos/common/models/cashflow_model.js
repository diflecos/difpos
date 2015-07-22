CashFlow=function CashFlow(flow_type,amount,concept,comment) {
	this.flow_type=flow_type; // "In" --> money inputs in the POS, "Out" --> money outputs the POS
	this.amount=amount;
	this.concept=concept;
	this.comment=comment;
}

