Template.install.rendered=function() {
	Accounts.createUser({username: "admin",password: "admin"});

	var brand_phone_id;
	var brand_phone=new Phone({
		name: "Atención al cliente",
		prefix: "+34",
		nbr: "910144408"
	});
	Meteor.call("phoneSave",brand_phone,function(error,result) {console.log(error)
		if(error==undefined) {
			brand_phone_id=result._id;
		} else {    
			throw new Meteor.Error("installation-failed","La instalación falló",error.details);
		}
	});
	
	var brand_email_id;
	var brand_email=new Email({
		name: "Atención al cliente",
		email: "contacto@balzaq.com"
	});
	Meteor.call("emailSave",brand_email,function(error,result) {
		brand_email_id=result._id;
	});
			
	var brand=new Brand({
		name: "Balzaq",
		logo: "http://www.balzaqtallasgrandes.com/img/balzaq-logo-14278057861.jpg",
		url: "www.balzaq.com",
		customerCarePhoneId: brand_phone_id,
		customerCareEmailId: brand_email_id,
		socialIds: [],
	});
	Meteor.call("brandSave",brand);
	
	var tax_address=new Address({
		name: "Domicilio fiscal",
		street: "C/Francisco Madariaga, 2 - 2ºC",
		town: "Madrid",
		zipcode: "28017",
		country: "España"
	});
	Meteor.call("addressSave",tax_address,function(error,result) {
		tax_address_id=result._id;
	});

	var currency=new Currency({
		name: "Euro",
		shortname: "EUR",
		symbol: "€",
		precision: 2,
		bills: [50000,20000,10000,5000,2000,1000,500],
		coins: [200,100,50,20,10,5,2,1]
	});
	Meteor.call("currencySave",currency,function(error,result) {
		currency_id=result._id;
	});		
	
	var company=new Company({
		currencyId: currency_id,
		taxNbr: "B86407590",
		taxName: "Diflecos Commerce, S.L.",
		taxAddressId: tax_address_id,
		commercialName: "Diflecos",
		logo: "http://diflecos.difblog.com/wp-content/uploads/sites/12/2013/02/logo1.jpg"
	});
	Meteor.call("companySave",company);
	
}
	
	
	
/* 	var tax=new Tax("IVA 21%",21);
	var regional_store_network=new RegionalStoreNetwork(brand,company,"Balzaq España",tax,currency);
	
	var store_address1=new Address("Dirección","C/Alcalá, 402 (bajo)","Madrid","28027","España");
	var store=new Store({name: "Tienda ALCALA, 402",currency: regional_store_network.currency,address: store_address1,phone: "910144408"});
	Meteor.call("storeSave",store);

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
 */


/*   Añadir insecure para ejecutar desde la consola


store1=new Store();
store1.set("name","Tienda ALCALA, 402");
store1.set("currency",currency);
store1.set("regional_store_network",{});
store1.set("address",{ name: "Dirección", street: "C/Alcalá, 402 (bajo)",town: "Madrid",zipcode: "28027",country: "España"});
store1.set("phone","910144408");
Meteor.call("storeSave",store1,function(error, result){
	if(error) console.log(error);
	else console.log("OK: "+result);
});


store2=new Store();
store2.set("name","Tienda FRANCISCO SILVELA");
store2.set("currency",currency);
store2.set("regional_store_network",{});
store2.set("address",{ name: "Dirección", street: "C/Franscisco Silvela, 17 (bajo)",town: "Madrid",zipcode: "28038",country: "España"});
store2.set("phone","910155508");
Meteor.call("storeSave",store2,function(error, result){
	if(error) console.log(error);
	else console.log("OK: "+result);
});



*/