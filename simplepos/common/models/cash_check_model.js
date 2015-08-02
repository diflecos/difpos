/* billcoin_count es un array de la forma: 
[
	{billcoin_value: XXX, quantity: Y},
]
*/
CashCheck=function CashCheck(billcoin_count,type,comment) {
	this.brandId;
	this.billcoin_count=billcoin_count;
	this.type=type;
	this.comment=comment;
	this.op_date=undefined;
}

CashCheck.prototype.count=function() {
	var total=0;
	$.each(this.billcoin_count,function(i,record) {
		total+=parseInt(record.billcoin_value)*parseInt(record.quantity);
	});
	return total;
}

CashCheck.prototype.save=function(callback) {
	Meteor.call('cashCheckAdd',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		this.cashFlowId=result;
		callback();
	});		
}

CashCheck.prototype.remove=function(callback) {
	Meteor.call('cashCheckRemove',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		callback();
	});		
}