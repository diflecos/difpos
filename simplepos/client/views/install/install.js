Template.install.rendered=function() {
	Accounts.createUser({username: "admin",password: "admin"});
	
	brand=new Brand("Balzaq","http://www.balzaqtallasgrandes.com/img/balzaq-logo-14278057861.jpg","www.balzaq.com","contacto@balzaq.com","910144408");
	var tax_address=new Address("Domicilio fiscal","C/Francisco Madariaga, 2 - 2ºC","Madrid","28017","España");
	company=new Company("B86407590","Diflecos Commerce, S.L.",tax_address,"http://diflecos.difblog.com/wp-content/uploads/sites/12/2013/02/logo1.jpg");
	currency=new Currency("Euro","EUR","€",2,
		[
			{label: "500€", value: 50000},
			{label: "200€", value: 20000},
			{label: "100€", value: 10000},
			{label: " 50€", value:  5000},
			{label: " 20€", value:  2000},
			{label: " 10€", value:  1000},
			{label: "  5€", value:   500},
		],[
			{label: "   2€", value: 200},
			{label: "   1€", value: 100},
			{label: "0,50€", value:  50},
			{label: "0,20€", value:  20},
			{label: "0,10€", value:  10},
			{label: "0,05€", value:   5},
			{label: "0,02€", value:   2},
			{label: "0,01€", value:   1},
		]
	);
	tax=new Tax("IVA 21%",21);
	var regional_store_network=new RegionalStoreNetwork(brand,company,"Balzaq España",tax,currency);
	
	var store_address1=new Address("Dirección","C/Alcalá, 402 (bajo)","Madrid","28027","España");
	Stores.insert({name: "Tienda ALCALA, 402",currency: regional_store_network.currency,address: store_address1,phone: "910144408"});	

	var store_address2=new Address("Dirección","C/Franscisco Silvela, 17 (bajo)","Madrid","28038","España");
	Stores.insert({name: "Tienda FRANCISCO SILVELA",currency: regional_store_network.currency,address: store_address2,phone: "910144408"});	

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
		currency: store.currency,
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