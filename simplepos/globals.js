// en esta variable global almacenamos los datos de la tienda
 
currentOrder={};   // En esta variable global guardamos el currentOrder y es con lo que operamos en cada momento. Cuando queremos refrescar la pantalla con los nuevos datos, simplemente salvamos este objeto en la Session y los templates que dependan de esa variable de Session se actualizarán

currency={};
brand={};
company={};
tax={};
store={}; 

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
	var store_address=new Address("Dirección","C/Alcalá, 402 (bajo)","Madrid","28027","España");
	store=new Store("Tienda ALCALA, 402",regional_store_network.currency,store_address,"910144408");