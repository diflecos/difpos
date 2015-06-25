function Currency(name,shortname,symbol) {
	this.name=name;
	this.shortname=shortname;
	this.symbol=symbol;
}

function Discount(name,type,value) {
	this.name=name;
	this.type=type;
	this.value=value;
	this.next_index=0;
}

Discount.prototype.getDiscountedPrice=function(price) {
	var discounted_price;
	switch(this.type) {
		case "amount": 
			discounted_price=price-this.value;
			break;
		case "percentage":
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
function OrderItem(index,name,unit_price,unit_discount,quantity,discount) {
	this.index=index;
	this.name=name;
	this.unit_price=unit_price;
	this.unit_discount=unit_discount;
	this.final_unit_price=unit_discount.getDiscountedPrice(unit_price);
	this.quantity=quantity;
	this.price=this.final_unit_price*this.quantity;
	this.discount=discount;
	this.final_price=discount.getDiscountedPrice(this.price);
}

function Order(currency) {
	this.currency=currency;
	this.order_items=new Array();
	this.final_price=0;
}

Order.prototype.sessionSave=function(key) {
	Session.set(key,this);
}

Order.prototype.add_order_item=function(order_item) {

}

Order.prototype.del_order_item=function(index) {

}


/*************************   EJEMPLO   *************************
// Define a class like this
function Person(name, gender){

   // Add object properties like this
   this.name = name;
   this.gender = gender;
}

// Add methods like this.  All Person objects will be able to invoke this
Person.prototype.speak = function(){
    alert("Howdy, my name is" + this.name);
};

// Instantiate new objects with 'new'
var person = new Person("Bob", "M");

// Invoke methods like this
person.speak(); // alerts "Howdy, my name is Bob"
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
	};
	
*/