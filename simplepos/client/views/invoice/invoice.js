Template.invoice.helpers({
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
	},
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
	},
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
	},
	id: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession._id;		
	},
	purchase_date: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.purchase_date;
	},
	employee_name: function() {
		currentOrderInSession=Session.get("currentOrder");
		userId=currentOrderInSession.employee;
		var user;
		Meteor.call('viewUser', userId, function(error, result){
			// TODO: ver qué hacemos en caso de error!
			user=result;
		});		
		return user.username;
	},
	currency_symbol: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.currency.symbol;
	},
	order_items: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.order_items;
	},
	payment_trxs: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.payment_trxs;
	},
	isThereOrderItems: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.order_items.length>0;
	},
	isTherePayments: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.payment_trxs.length>0;
	},
	isOrderSettled: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.settled=="Yes";
	},
	isThereDiscount: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.discount!=undefined;	
	},
	discountName: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.discount.name;	
	},
	discount: function() {
		currentOrderInSession=Session.get("currentOrder");	
		if(currentOrderInSession.discount==undefined) 
			return "";
		
		if(currentOrderInSession.discount.type=="Percentage")
			return "-"+currentOrderInSession.discount.value+"%";
			
		if(currentOrderInSession.discount.type=="Amount") {
			return "-"+currentOrderInSession.discount.value+currentOrderInSession.currency.symbol;
		}	
	},
	UI_subtotal: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrder.currency.convertUI(currentOrderInSession.subtotal);
	},
	UI_discount: function() {
		return currentOrderInSession.discount.display;
	},
	UI_final_price: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrder.currency.convertUI(currentOrderInSession.final_price);
	},
	reductionTypes: function() {
		return OPTIONS.REDUCTION_TYPE;
	},
	isSettled: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.is_settled;
	},
	restToSettle: function() {
		currentOrderInSession=Session.get("currentOrder");
		return store.currency.convertUI(currentOrderInSession.final_price-currentOrderInSession.paid);
	},
	isTherePublicComment: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.public_comment!="";
	},	
	public_comment: function() {
		currentOrderInSession=Session.get("currentOrder");
		return currentOrderInSession.public_comment;
	} 
});

Template.order.events({
	"click #print": function(event) {
		event.preventDefault();
	}
});

Template.invoice_order_item.helpers({
	UI_unit_price: function() {
		return currentOrder.currency.convertUI(this.unit_price);
	},
	UI_unit_discount: function() {
		return (this.unit_discount!=undefined)?this.unit_discount.display:"";
	},
	UI_final_unit_price: function() {
		return currentOrder.currency.convertUI(this.final_unit_price);
	},
	UI_price: function() {
		return currentOrder.currency.convertUI(this.price);
	},
	UI_order_item_discount: function() {
		return (this.discount!=undefined)?this.discount.display:"";
	},
	UI_final_price: function() {
		return currentOrder.currency.convertUI(this.final_price);
	}
});

Template.invoice_payment_trx.helpers({
	UI_paid: function() {
		return currentOrder.currency.convertUI(this.paid);
	},
	index: function() {
		return 0; // REVISAR --> bien añadimos un payment_trx_index al Order o bien cuando meteor soporte {{@index}} en los templates lo ponemos
	}
});
