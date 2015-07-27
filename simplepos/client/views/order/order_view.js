Template.order_view.helpers({
	id: function() {
		return this.id;		
	},
	currency_symbol: function() {
		return this.currency.symbol;
	},
	order_items: function() {
		return this.order_items;
	},
	payment_trxs: function() {
		return this.payment_trxs;
	},
	isThereOrderItems: function() {
		return this.order_items.length>0;
	},
	isTherePublicComment: function() {
		return this.public_comment!="";
	}, 
	isTherePrivateComment: function() {
		return this.private_comment!="";
	},
	public_comment: function() {
		return this.public_comment;
	},
	private_comment: function() {
		return this.private_comment;
	}, 
	isTherePayments: function() {
		return this.payment_trxs.length>0;
	},
	isOrderSettled: function() {
		return this.is_settled;
	},
	isThereDiscount: function() {
		return this.discount!=undefined;	
	},
	discountName: function() {
		return this.discount.name;	
	},
	discount: function() {
		if(this.discount==undefined) 
			return "";
		
		if(this.discount.type=="Percentage")
			return "-"+this.discount.value+"%";
			
		if(this.discount.type=="Amount") {
			return "-"+this.discount.value+this.currency.symbol;
		}	
	},
	UI_subtotal: function() {
		return currentOrderCurrency.convertUISymbol(this.subtotal);
	},
	UI_discount: function() {
		return this.discount.display;
	},
	UI_final_price: function() {
		return currentOrderCurrency.convertUISymbol(this.final_price);
	},
	reductionTypes: function() {
		return OPTIONS.REDUCTION_TYPE;
	},
	restToSettle: function() {
		return currentOrderCurrency.convertUISymbol(this.final_price-this.paid);
	}
});

Template.order_view.events({

});

Template.view_order_item.helpers({
	UI_unit_price: function() {
		return currentOrderCurrency.convertUISymbol(this.unit_price);
	},
	UI_unit_discount: function() {
		return (this.unit_discount!=undefined)?this.unit_discount.display:"";
	},
	UI_final_unit_price: function() {
		return currentOrderCurrency.convertUISymbol(this.final_unit_price);
	},
	UI_price: function() {
		return currentOrderCurrency.convertUISymbol(this.price);
	},
	UI_order_item_discount: function() {
		return (this.discount!=undefined)?this.discount.display:"";
	},
	UI_final_price: function() {
		return currentOrderCurrency.convertUISymbol(this.final_price);
	}
});


Template.view_order_payment_trx.helpers({
	UI_paid: function() {
		return currentOrderCurrency.convertUISymbol(this.paid);
	},
	details: function() {
		return this.details.displayShort();
	}, 
	index: function() {
		return 0; // REVISAR --> bien añadimos un payment_trx_index al Order o bien cuando meteor soporte {{@index}} en los templates lo ponemos
	}
});

Template.payment_trx.events({

});
