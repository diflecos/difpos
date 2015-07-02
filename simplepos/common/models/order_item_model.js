// ATENCION: todas los metodos de Order, Discount, etc funcionan con los precios multiplicados por 100!! Solo se convierte a euros cuando vayamos a mostrarlo en pantalla o algo!



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

/* 
Updates OrderItem prices based on unit_price and relevant discounts that may exist
To be taken into account: method  getDiscountedPrice() will be called no matter what type of discount we are dealing with (AmountDiscount or PercentageDiscount), so all of them must implement this method in order to avoid errors 

This method may be called whenever a discount is added to/removed from the OrderItem. Thus it must exist on its own (if this were not the case this piece of code would just make part of the constructor)
*/
OrderItem.prototype.updatePrices=function() {
	this.final_unit_price=(this.unit_discount!=undefined)?this.unit_discount.getDiscountedPrice(this.unit_price):this.unit_price;
	this.price=this.final_unit_price*this.quantity;
	this.final_price=(this.discount!=undefined)?this.discount.getDiscountedPrice(this.price):this.price;
}

/* Increments by 1 the quantity of the OrderItem and updates prices accordingly */
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
