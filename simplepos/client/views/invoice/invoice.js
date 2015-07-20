Template.invoice.helpers({
	currency_symbol: function() {
		return this.currency.symbol;
	},
	isNotGiftInvoice: function() {
		return !this.isGiftInvoice;
	},
	isThereOrderItems: function() {
		return this.order_items.length>0;
	},
	isTherePayments: function() {
		return this.payment_trxs.length>0;
	},
	isOrderSettled: function() {
		return this.settled=="Yes";
	},
	isThereDiscount: function() {
		return this.discount!=undefined;	
	},
	discountName: function() {
		return this.discount.name;	
	},
	reductionTypes: function() {
		return OPTIONS.REDUCTION_TYPE;
	},
	isSettled: function() {
		return this.is_settled;
	},
	restToSettle: function() {
		return store.currency.convertUI(this.final_price-this.paid);
	},
	isTherePublicComment: function() {
		return this.public_comment!="";
	},	
	public_comment: function() {
		return this.public_comment;
	} 
});

Template.order.events({
	"click #print": function(event) {
		event.preventDefault();
	}
});

Template.invoice_brand.helpers({
	brand_logo: function() {
		return brand.logo;
	},
	brand_url: function() {
		return brand.url;
	},
	brand_phone: function() {
		return brand.phone;
	},
	brand_email: function() {
		return brand.email;
	}
});	

/*
Template.invoice_special_offers.helpers({
});

Template.invoice_conditions.helpers({
});
*/

Template.invoice_company.helpers({
	company_tax_name: function() {
		return company.tax_name;
	},
	company_tax_nbr: function() {
		return company.tax_nbr;
	},
	company_tax_address_street: function() {
		return company.tax_address.street;
	},
	company_tax_address_town: function() {
		return company.tax_address.town;
	},
	company_tax_address_zipcode: function() {
		return company.tax_address.zipcode;
	}
});	

Template.invoice_store.helpers({
	store_name: function() {
		return store.name;
	},
	store_address_street: function() {
		return store.address.street;
	},
	store_address_town: function() {
		return store.address.town;
	},
	store_address_zipcode: function() {
		return store.address.zipcode;
	},
	store_phone: function() {
		return store.phone;
	}
});

Template.invoice_order_qrcode.helpers({
	id: function() {
		return this._id;		
	},
	purchase_date: function() {
		return this.purchase_date;
	},
	employee_name: function() {
		userId=this.employee;
		var user;
		Meteor.call('viewUser', userId, function(error, result){
			// TODO: ver qué hacemos en caso de error!
			user=result;
		});		
		return user.username;
	}
});

Template.invoice_order_items.helpers({
	order_items: function() {
		return this.order_items;
	},
	discount: function() {
		if(this.discount==undefined) 
			return "";
		
		if(currentOrderInSession.discount.type=="Percentage")
			return "-"+this.discount.value+"%";
			
		if(currentOrderInSession.discount.type=="Amount") {
			return "-"+this.discount.value+this.currency.symbol;
		}	
	},
	UI_subtotal: function() {
		return store.currency.convertUI(this.subtotal);
	},
	UI_discount: function() {
		return this.discount.display;
	},
	UI_final_price: function() {
		return store.currency.convertUI(this.final_price);
	}	
});

Template.invoice_payment_trxs.helpers({
	payment_trxs: function() {
		return this.payment_trxs;
	},
	UI_paid: function() {
		return store.currency.convertUI(this.paid);
	},	
});

Template.invoice_order_item.helpers({
	UI_unit_price: function() {
		return store.currency.convertUI(this.unit_price);
	},
	UI_unit_discount: function() {
		return (this.unit_discount!=undefined)?this.unit_discount.display:"";
	},
	UI_final_unit_price: function() {
		return store.currency.convertUI(this.final_unit_price);
	},
	UI_price: function() {
		return store.currency.convertUI(this.price);
	},
	UI_order_item_discount: function() {
		return (this.discount!=undefined)?this.discount.display:"";
	},
	UI_final_price: function() {
		return store.currency.convertUI(this.final_price);
	}
});

Template.invoice_payment_trx.helpers({
	UI_paid: function() {
		return store.currency.convertUI(this.paid);
	},
	index: function() {
		return 0; // REVISAR --> bien añadimos un payment_trx_index al Order o bien cuando meteor soporte {{@index}} en los templates lo ponemos
	}
});
