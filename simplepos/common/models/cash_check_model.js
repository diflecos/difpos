/* billcoin_count es un array de la forma: 
[
	{billcoin_value: XXX, quantity: Y},
]
*/
CashCheck=function CashCheck(billcoin_count,type,comment) {
	this.billcoin_count=billcoin_count;
	this.type=type;
	this.comment=comment;
}

CashCheck.prototype.count=function() {
	var total=0;
	$.each(this.billcoin_count,function(i,record) {
		total+=parseInt(record.billcoin_value)*parseInt(record.quantity);
	});
	return total;
}
