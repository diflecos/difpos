Order=function Order(currency) {  
	this.id;
	this.session;  //  Inicializarlo con la currentSession!!!!!
	this.currency=currency;
	this.order_items=[];
	this.subtotal=0;
	this.final_price=0;
	this.next_index=0;
	this.payment_trxs=[];
	this.paid=0;
	this.is_settled=false;
	this.public_comment="";
	this.private_comment="";
}

/* Estas funciones de toEJSON y fromEJSON son necesarias para que al salvar una Order en la Session y volverla a recuperar que se reconoza como un objeto Order con sus métodos --> sino lo hacemos así se pierden los métodos y no los podemos utilizar porque la Session solo guarda datos 
Ver http://stackoverflow.com/questions/24504392/meteor-storing-and-retrieving-custom-objects-in-session  para más detalles  --> LO USAMOS AL FINAL?? creo que no...  porque estamos trabajando siempre con el objeto currentOrder en memoria y simplemente salvandolo cuando hay cambios a la Session (aunque se pierdan los métodos) para que se actualice la interfaz */
/*
Order.fromEJSON=function(ejson) {   
    var obj = new Order(undefined);
    obj.currency=ejson.currency;
    obj.order_items=ejson.order_items;
	obj.final_price=ejson.final_price;
	obj.next_index=ejson.next_index;
    return obj;
}

Order.prototype.toEJSON=function() {   
    return {
		currency: this.currency,
		order_items: this.order_items,
		final_price: this.final_price,
		next_index: this.next_index,
    };
} */
Order.prototype.find=function() {
	if(this.id!=undefined) {  console.log("find() : id: "+this.id);
		var order=Orders.findOne(this.id);
		console.log("find(): order:"+order);
		this.id=order._id;
		this.session=order.session; 
		this.currency=new Currency(order.currency);
		this.order_items=order.order_items;
		this.subtotal=order.subtotal;
		this.final_price=order.final_price;
		this.next_index=order.next_index;
		this.payment_trxs=order.payment_trxs;
		this.paid=order.paid;
		this.is_settled=order.is_settled;
		this.public_comment=order.public_comment;
		this.private_comment=order.private_comment;
	} else {
		throw new Meteor.Error("orderIdUndefined","Impossible to find an order with undefined id"); 
	}
}

Order.prototype.save=function(callback) {
	self=this;
	Meteor.call('orderSave',this,function(error, result){
		// TODO: ver qué hacemos en caso de error! 
	
		if(result.insertedId!=undefined) {
			self.id=result.insertedId;
		}

		if(callback!=undefined) {
			callback();		
		}
	});		
}

Order.prototype.remove=function(callback) {
	Meteor.call('orderRemove',this,function(error, result){
		// TODO: ver qué hacemos en caso de error!
		callback();
	});		
}

Order.prototype.updateFinalPrice=function() {
	var subtotal=0;
	$.each(this.order_items,function(i,order_item) {
		subtotal+=order_item.final_price;
	});
	this.subtotal=subtotal;
	
	if(this.discount!=undefined) {
		this.final_price=this.discount.getDiscountedPrice(this.subtotal);
	} else {
		this.final_price=this.subtotal;
	}
}

Order.prototype.addOrderItem=function(order_item) {
	order_item.index=this.next_index++;
	this.order_items.push(order_item);
	this.updateFinalPrice();
}

Order.prototype.delOrderItem=function(index) {
	var arrayIndex;
	$.each(this.order_items,function(i,order_item) {
		if(order_item.index==index) {
			arrayIndex=i;
			return false;
		}
	});
	
	if(arrayIndex!=undefined) {
		this.order_items.splice(arrayIndex,1);
		this.updateFinalPrice();
	}
}

Order.prototype.add1=function(index) {
	var arrayIndex;
	$.each(this.order_items,function(i,order_item) {   
		if(order_item.index==index) {
			order_item.add1();
			return false;
		}	
	});
	this.updateFinalPrice();	
}

Order.prototype.del1=function(index) {
	var arrayIndex;
	$.each(this.order_items,function(i,order_item) {
		if(order_item.index==index) {
			order_item.del1();
			return false;
		}
	});
	this.updateFinalPrice();
}

Order.prototype.addDiscount=function(discount) {
	this.discount=discount;
	this.updateFinalPrice();
}

Order.prototype.removeDiscount=function() {
	this.discount=undefined;
	this.updateFinalPrice();
}

Order.prototype.updatePaid=function() {
	var paid=0;
	$.each(this.payment_trxs,function(i,payment_trx) {
		paid+=payment_trx.paid;	
	});
	this.paid=paid; 
	
	if(this.final_price==this.paid) {
		this.is_settled=true;
	} else {
		this.is_settled=false;
	}
}

Order.prototype.addPaymentTrx=function(payment_trx) {
	this.payment_trxs.push(payment_trx);
	this.updatePaid();
}

Order.prototype.delPaymentTrx=function(i) {
	if(i!=undefined) {
		this.payment_trxs.splice(i,1);
		this.updatePaid();
	}	
}

/*************************   EJEMPLO   *************************
currency=new Currency("Euro","EUR","€");
order=new Order(currency);
unit_discount=new Discount("Rebajas 30% en pantalones","percentage",30);
orderItem0=new OrderItem("Pantalón azul",10,unit_discount,1,undefined);
orderItem1=new OrderItem("Pantalón verde",12,unit_discount,2,undefined);
orderItem2=new OrderItem("Pantalón azul",15,undefined,1,undefined);
order.addOrderItem(orderItem0);
order.addOrderItem(orderItem1);
order.addOrderItem(orderItem2);
console.log(order.final_price);  // 7 + 2*8.4 + 15 = 38.8
order.delOrderItem(1);
console.log(order.final_price);  // 7 + 15 = 22
order_discount=new Discount("Descuento por cliente fiel","percentage",10);
order.addDiscount(order_discount);
console.log(order.final_price);  // 22 - 10% = 19.8
order.add1(2);  
console.log(order.final_price);  // (7 + 15*2) - 10% = 33.3

*************************   EJEMPLO   *************************/

/*
var order = {


    type: "macintosh",
    color: "red",
    getInfo: function () {
        return this.color + ' ' + this.type + ' apple';
    }
}



	currentOrder={
		currency: {
			name: "Euro",
			shortname: "EUR",
			symbol: "€"
		},
		order_items: [
			{
				index: 0,
				name: "Falda brocada",
				quantity: "1",
				unit_price: "24,50",
				price: "24,50"
			},{
				index: 1,
				name: "Camiseta azul",
				unit_price: "22,00",
				unit_discount: {
					name: "Oferta San Valentín",
					type: "amount",
					value: "10"
				},
				final_unit_price: "12,00",
				quantity: "2",
				price: "24,00",
				discount: {
					name: "Oferta de 10€ menos en 2x1",
					type: "amount",
					value: "10"
				},
				final_price: "14,00"
			},{
				index: 2,
				name: "Vestido fiesta rosa palo",
				quantity: "1",
				unit_price: "129,00",
				price: "129,00"
			}
		],
		order_discount: {
			type: "percentage",
			value: "10"
		},
		final_price: "168,00"
		payment_trxs: [
			{
				type: "Cash",
				amount: "168,00",
				details: {
					given: "200,00",
					returned: "32,00",
					cashed: "168,00"
				}
			}
		],
		paid: "168,00"
	};
	
*/
