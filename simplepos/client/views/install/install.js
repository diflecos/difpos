Template.install.rendered=function() {
	//Categories.remove({});
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
	
	
	currentOrder={
		currency: {
			name: "Euro",
			shortname: "EUR",
			symbol: "€"
		},
		order_items: [
			{
				name: "Falda brocada",
				quantity: "1",
				unit_price: "24,50",
				price: "24,50"
			},{
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
	Session.set("currentOrder",currentOrder);
	
}