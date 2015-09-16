Order=Operation.extend({
	name: 'Order',
	fields: {
		order_items: {
			type: 'array',	
		},
	},
	init: function (attrs) {  // Constructor
		this.set('sessionId',attrs.sessionId);
		this.set('currencyId',attrs.currencyId);
		this.set('date',attrs.date);
		this.set('payment_trxs',attrs.payment_trxs);
		this.set('public_comment',attrs.public_comment);
		this.set('private_comments',attrs.private_comments);
		this.set('cancelled',attrs.cancelled);

		this.set('order_items',attrs.order_items);
	},		
	relations: {

	},		
	methods: {
		addOrderItem: function(order_item) {
			order_item.index=this.next_index++;
			this.order_items.push(order_item);
			this.updateFinalPrice();
		},
		delOrderItem: function(index) {
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
		},

		addDiscount: function(discount) {
			this.discount=discount;
			this.updateFinalPrice();
		},
		removeDiscount: function() {
			this.discount=undefined;
			this.updateFinalPrice();
		},


	},
	validators: {
// FALTA!!!!

	}
});

/*************************   EJEMPLO   *************************
Ya no debe ser valido despues de migrar a Astronomy
currency=new Currency('Euro','EUR','€');
order=new Order(currency);
unit_discount=new Discount('Rebajas 30% en pantalones','percentage',30);
orderItem0=new OrderItem('Pantalón azul',10,unit_discount,1,undefined);
orderItem1=new OrderItem('Pantalón verde',12,unit_discount,2,undefined);
orderItem2=new OrderItem('Pantalón azul',15,undefined,1,undefined);
order.addOrderItem(orderItem0);
order.addOrderItem(orderItem1);
order.addOrderItem(orderItem2);
console.log(order.final_price);  // 7 + 2*8.4 + 15 = 38.8
order.delOrderItem(1);
console.log(order.final_price);  // 7 + 15 = 22
order_discount=new Discount('Descuento por cliente fiel','percentage',10);
order.addDiscount(order_discount);
console.log(order.final_price);  // 22 - 10% = 19.8
order.add1(2);  
console.log(order.final_price);  // (7 + 15*2) - 10% = 33.3

*************************   EJEMPLO   *************************/

/*
	currentOrder={
		currency: {
			name: 'Euro',
			shortname: 'EUR',
			symbol: '€'
		},
		order_items: [
			{
				index: 0,
				name: 'Falda brocada',
				quantity: '1',
				unit_price: '24,50',
				price: '24,50'
			},{
				index: 1,
				name: 'Camiseta azul',
				unit_price: '22,00',
				unit_discount: {
					name: 'Oferta San Valentín',
					type: 'amount',
					value: '10'
				},
				final_unit_price: '12,00',
				quantity: '2',
				price: '24,00',
				discount: {
					name: 'Oferta de 10€ menos en 2x1',
					type: 'amount',
					value: '10'
				},
				final_price: '14,00'
			},{
				index: 2,
				name: 'Vestido fiesta rosa palo',
				quantity: '1',
				unit_price: '129,00',
				price: '129,00'
			}
		],
		order_discount: {
			type: 'percentage',
			value: '10'
		},
		final_price: '168,00'
		payment_trxs: [
			{
				type: 'Cash',
				amount: '168,00',
				details: {
					given: '200,00',
					returned: '32,00',
					cashed: '168,00'
				}
			}
		],
		paid: '168,00'
	};
	
*/
