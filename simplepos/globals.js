Currency=function Currency(name,shortname,symbol) {
	this.name=name;
	this.shortname=shortname;
	this.symbol=symbol;
}

Discount=function Discount(name,type,value) {
	this.name=name;
	this.type=type;
	this.value=value;
}

Discount.prototype.getDiscountedPrice=function(price) {
	var discounted_price;
	switch(this.type) {
		case "Amount": 
			discounted_price=price-this.value;
			break;
		case "Percentage":
			discounted_price=price*(1-this.value/100);
			break;
	}
	return discounted_price;
}

/*	
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
*/

/* 
Cada OrderItem dentro de un Order irá identificada por un index. Este index se inicializa en el momento de añadir el OrderItem al Order (a partir de la variable next_index del Order) y ya no cambia nunca más. Es decir, si borramos un OrderItem no vamos a re-indexar los que quedan ni nada. 
*/
OrderItem=function OrderItem(name,unit_price,unit_discount,quantity,discount) {
	this.name=name;
	this.unit_price=unit_price;
	this.unit_discount=unit_discount;
	this.quantity=quantity;
	this.discount=discount;
	
	this.updatePrices();
}

OrderItem.prototype.updatePrices=function() {
	this.final_unit_price=(this.unit_discount!=undefined)?this.unit_discount.getDiscountedPrice(this.unit_price):this.unit_price;
	this.price=this.final_unit_price*this.quantity;
	this.final_price=(this.discount!=undefined)?this.discount.getDiscountedPrice(this.price):this.price;
}

OrderItem.prototype.add1=function() {
	this.quantity++;
	this.updatePrices();	
}

/* Este método no hace nada cuando la cantidad es 1, para que se produzca el decremento la cantidad inicial tiene que ser de 2 o más */
OrderItem.prototype.del1=function() {
	if(this.quantity>1) {
		this.quantity--;
		this.updatePrices();			
	}
}

CashPaymentDetails=function CashPaymentDetails(given,cashed) {
	this.given=given;
	this.cashed=cashed;
	this.returned=given-cashed;
}

PaymentTrx=function PaymentTrx(type,paid,details) {
	this.type=type;
	this.paid=paid;
	this.details=details;
}

/* 
FALTA: hay que encontrar una solución para mostrar y almacenar los precios siempre en el formato XXX.XX 
La solución empleando toFixed(2) no funciona porque convierte los números a strings y genera errores al realizar cálculos posteriores --> se podría solventar con un parseFloat antes de utilizar cualquier precio para un cálculo
Otra posibilidad es almacenar todas las cantidades multiplicadas por 100 y guardar este 100 como un atributo en el Currency --> el problema es que parece complicar un poco los cálculos, habría que mirarlo bien --> lo bueno de esta opción es que parece más precisa que la anterior)
*/
Order=function Order(currency) {
	this.currency=currency;
	this.order_items=[];
	this.subtotal=0;
	this.final_price=0;
	this.next_index=0;
	this.payment_trxs=[];
	this.paid=0;
	this.settled="No";
}

/* Estas funciones de toEJSON y fromEJSON son necesarias para que al salvar una Order en la Session y volverla a recuperar que se reconoza como un objeto Order con sus métodos --> sino lo hacemos así se pierden los métodos y no los podemos utilizar porque la Session solo guarda datos 
Ver http://stackoverflow.com/questions/24504392/meteor-storing-and-retrieving-custom-objects-in-session  para más detalles  */
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
		this.settled="Yes";
	} else {
		this.settled="No";
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

currentOrder={};   // En esta variable global guardamos el currentOrder y es con lo que operamos en cada momento. Cuando queremos refrescar la pantalla con los nuevos datos, simplemente salvamos este objeto en la Session y los templates que dependan de esa variable de Session se actualizarán

