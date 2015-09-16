Meteor.startup(function () {
	var currency=new Currency({
		name: 'Euro',
		shortname: 'EUR',
		symbol: '€',
		precision: 2,
		bills: [50000,20000,10000,5000,2000,1000,500],
		coins: [200,100,50,20,10,5,2,1],
	});
	currency.save();

	var tax_iva=new Tax({ 
		name: 'IVA 21%',
		percentage: 21,
	});
	tax_iva.save();

	var discount=new Discount({
		name: 'Semana Fantástica',
		type: 'Amount',
		amount: 1000,
		percentage: 0,
		apply: 'BeforeTax',
	});

	var comment=new Comment({
		date: new Date(),
		userId: this.userId,
		text: 'Este es el comentario',
	});

	var init_cashcheck=new CashCheck({
		date: new Date(),
		billcoin_count: [  // count: 4500
			{billcoin_value: 1000, quantity: 1},
			{billcoin_value: 500, quantity: 3},
			{billcoin_value: 200, quantity: 5},
			{billcoin_value: 100, quantity: 8},
			{billcoin_value: 50, quantity: 4},
		],
		type: '',
		comments: [ comment ],
	});
	init_cashcheck.save();

	var end_cashcheck=new CashCheck({
		date: new Date(),
		billcoin_count: [  // count: 8500
			{billcoin_value: 2000, quantity: 2},
			{billcoin_value: 1000, quantity: 1},
			{billcoin_value: 500, quantity: 3},
			{billcoin_value: 200, quantity: 5},
			{billcoin_value: 100, quantity: 8},
			{billcoin_value: 50, quantity: 4},
		],
		type: '',
		comments: [],
	});
	end_cashcheck.save();

	var session=new SessionPOS({
		storeId: '',
		userId: this.userId,
		type: '',
		status: '',
		init: new Date(),
		end: undefined,
		'init_cashcheck': init_cashcheck,
		'end_cashcheck': end_cashcheck,
		init_verification: '',
		end_verification: '',
		ip: '',
		comments: []
	});
	session.save();

	var order_item1=new OrderItem({
		name: 'Pantalones pinza azules',
		unit_price_bt: 1995,
		unit_discount: discount,
		quantity: 2,
		tax: tax_iva,
	});
	order_item1.save();
			
	var order1=new Order({
		sessionId: session._id,
		currencyId: currency._id,
		date: new Date(),
		payment_trxs: [],
		public_comment: '',
		private_comments: [],
		cancelled: false,
		order_items: [order_item1],
	});
	order1.save();

	var payment1=new PaymentTrxCash({
		operationId: order1._id,
		amount: 1999,
		currencyId: currency._id,
		given: 3000,
	});  
	payment1.save();
});