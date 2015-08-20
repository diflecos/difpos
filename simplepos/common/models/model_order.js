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
	this.public_comment='';
	this.private_comment='';
	this.op_date=undefined;
}

Order=Astro.Class({
	name: 'Order',
	collection: Orders,
	fields: {
		sessionId: {
			type: 'string',
		},
		currency: {
			type: 'object',	
		},
		order_items: {
			type: 'array',	
		},
		subtotal: {
			type: 'number',	
		},
		final_price: {
			type: 'number',	
		},
		next_index: {
			type: 'number',	
			default: 0,
		},
		payment_trxs: {
			type: 'array',	
		},
		paid: {
			type: 'number',	
			default: 0,
		},
		is_settled: {
			type: 'boolean',	
			default: false,
		},
		public_comment: {
			type: 'string',	
		},
		private_comment: {
			type: 'string',	
		},
		op_date: {
			type: 'date',	
		},	
	},
	behaviors: ['audit_trail'],	
	relations: {
		session: {
			type: 'one',
			class: 'Session',
			local: 'sessionId',
			foreign: '_id'			
		},
	},		
	methods: {
		updateFinalPrice: function() {
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
		},
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
		add1: function(index) {
			var arrayIndex;
			$.each(this.order_items,function(i,order_item) {   
				if(order_item.index==index) {
					order_item.add1();
					return false;
				}	
			});
			this.updateFinalPrice();	
		},
		del1: function(index) {
			var arrayIndex;
			$.each(this.order_items,function(i,order_item) {
				if(order_item.index==index) {
					order_item.del1();
					return false;
				}
			});
			this.updateFinalPrice();
		},
		addDiscount: function(discount) {
			this.discount=discount;
			this.updateFinalPrice();
		},
		removeDiscount: function() {
			this.discount=undefined;
			this.updateFinalPrice();
		},
		updatePaid: function() {
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
		},
		addPaymentTrx: function(payment_trx) {
			this.payment_trxs.push(payment_trx);
			this.updatePaid();
		},
		delPaymentTrx: function(i) {
			if(i!=undefined) {
				this.payment_trxs.splice(i,1);
				this.updatePaid();
			}	
		}
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
