Template.install.rendered=function() {


	Categories.find();
	root_id=Categories.insert({ name: "Inicio", shortdesc: "Inicio", desc: "Inicio", parent: null});
	
	up_id=Categories.insert({ name: "Partes de arriba", shortdesc: "Partes de arriba", desc: "Partes de arriba Partes de arriba Partes de arriba", parent: root_id});
	down_id=Categories.insert({ name: "Partes de abajo", shortdesc: "Partes de abajo", desc: "Partes de abajo Partes de abajo Partes de abajo", parent: root_id});
	
	Categories.insert({ name: "Camisas", shortdesc: "Camisas", desc: "Camisas", parent: up_id});
	Categories.insert({ name: "Camisetas", shortdesc: "Camisetas", desc: "Camisetas", parent: up_id});
	Categories.insert({ name: "Chaquetas", shortdesc: "Chaquetas", desc: "Chaquetas", parent: up_id});
	Categories.insert({ name: "Abrigos", shortdesc: "Abrigos", desc: "Abrigos", parent: up_id});
	Categories.insert({ name: "Blusas", shortdesc: "Blusas", desc: "Blusas", parent: up_id});
	Categories.insert({ name: "Tops", shortdesc: "Tops", desc: "Tops", parent: up_id});
	
	Categories.insert({ name: "Pantalones", shortdesc: "Pantalones", desc: "Pantalones", parent: down_id});
	Categories.insert({ name: "Leggings", shortdesc: "Leggings", desc: "Leggings", parent: down_id});
	Categories.insert({ name: "Shorts", shortdesc: "Shorts", desc: "Shorts", parent: down_id});
	
	SpecialOffers.insert({ applies_to: "item", name: "Rebajas 50%", desc: "Prendas rebajadas al 50% durante el periodo de rebajas", value: 50, reduction_type: "Percentage", valid_from: "01/07/2015", valid_to: "31/08/2015"});
	SpecialOffers.insert({ applies_to: "item", name: "Día de la Madre 20%", desc: "Solo partes de arriba", valid_from: "01/07/2015", value: 20, reduction_type: "Percentage", valid_to: "31/08/2015"});
	SpecialOffers.insert({ applies_to: "item", name: "Semana Fantástica en Balzaq", desc: "Todo al 10% durante una semana", value: 10, reduction_type: "Percentage", valid_from: "01/07/2015", valid_to: "31/08/2015"});
	SpecialOffers.insert({ applies_to: "order_item", name: "Camisetas 2x1", desc: "Camisetas al 50% pero se tiene que llevar mínimo 2", value: 50, reduction_type: "Percentage", valid_from: "01/07/2015", valid_to: "31/08/2015"});
	SpecialOffers.insert({ applies_to: "order", name: "Flyer Balzaq", desc: "10€ de descuento por compra superior a 50€", value: 10, reduction_type: "Amount", valid_from: "01/07/2015", valid_to: "31/08/2015"});
	
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
	
}